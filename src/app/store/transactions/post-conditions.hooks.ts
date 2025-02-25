import { useMemo } from 'react';

import { ContractCallPayload, ContractDeployPayload, STXTransferPayload } from '@stacks/connect';
import { FungiblePostCondition, addressToString } from '@stacks/transactions';

import {
  getPostCondition,
  handlePostConditions,
} from '@app/common/transactions/stacks/post-condition.utils';
import { useGetFungibleTokenMetadataQuery } from '@app/query/stacks/fungible-tokens/fungible-token-metadata.query';
import { useCurrentAccountStxAddressState } from '@app/store/accounts/account.hooks';

import { useTransactionRequestState } from './requests.hooks';

export function formatPostConditionState(
  payload?: ContractCallPayload | ContractDeployPayload | STXTransferPayload | null,
  address?: string
) {
  if (!payload || !address) return;

  if (payload.postConditions) {
    if (payload.stxAddress)
      return handlePostConditions(payload.postConditions, payload.stxAddress, address);

    return payload.postConditions.map(getPostCondition);
  }
  return [];
}

export function usePostConditionModeState() {
  return useTransactionRequestState()?.postConditionMode;
}

export function usePostConditionState() {
  const payload = useTransactionRequestState();
  const address = useCurrentAccountStxAddressState();
  return useMemo(() => formatPostConditionState(payload, address), [address, payload]);
}

export function useAssetFromFungiblePostCondition(pc: FungiblePostCondition) {
  const contractAddress = addressToString(pc.assetInfo.address);
  const contractName = pc.assetInfo.contractName.content;
  const contractId = `${contractAddress}.${contractName}`;
  const { data: asset } = useGetFungibleTokenMetadataQuery(contractId);
  return !asset || 'error' in asset ? undefined : asset;
}
