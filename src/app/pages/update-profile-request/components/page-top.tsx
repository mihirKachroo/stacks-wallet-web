import { memo } from 'react';

import { Flex, Stack } from '@stacks/ui';

import { getProfileDataContentFromToken } from '@app/common/profiles/requests';
import { addPortSuffix, getUrlHostname } from '@app/common/utils';
import { Caption, Title } from '@app/components/typography';
import { useCurrentNetworkState } from '@app/store/networks/networks.hooks';
import { useProfileUpdateRequestSearchParams } from '@app/store/profiles/requests.hooks';

function PageTopBase() {
  const { isTestnet, chain } = useCurrentNetworkState();
  const { origin, requestToken } = useProfileUpdateRequestSearchParams();
  if (!requestToken) return null;
  const profileUpdaterPayload = getProfileDataContentFromToken(requestToken);
  if (!profileUpdaterPayload) return null;

  const appName = profileUpdaterPayload?.appDetails?.name;
  const originAddition = origin ? ` (${getUrlHostname(origin)})` : '';
  const testnetAddition = isTestnet
    ? ` using ${getUrlHostname(chain.stacks.url)}${addPortSuffix(chain.stacks.url)}`
    : '';
  const caption = appName
    ? `Requested by "${appName}"${originAddition}${testnetAddition}`
    : 'Request by an unknown app';
  const avatarUrl = profileUpdaterPayload?.profile?.image?.[0]?.contentUrl;
  return (
    <Flex justify="space-between" align="center">
      <Stack pt="extra-loose" spacing="base">
        <Title fontWeight="bold" as="h1">
          Update Profile
        </Title>
        {caption && <Caption wordBreak="break-word">{caption}</Caption>}
      </Stack>
      {avatarUrl && (
        <img
          style={{
            borderRadius: '100%',
            width: '50px',
            height: '50px',
            alignItems: 'center',
            marginTop: '32px',
          }}
          src={avatarUrl}
        />
      )}
    </Flex>
  );
}

export const PageTop = memo(PageTopBase);
