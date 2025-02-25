import { FundPageSelectors } from '@tests-legacy/page-objects/fund.selectors';

import { AvailableRegions } from '@app/query/common/hiro-config/hiro-config.query';

import { FastCheckoutBadge } from './fast-checkout-badge';
import { FundAccountTile } from './fund-account-tile';
import { ZeroPercentFeesBadge } from './zero-percent-fees-badge';

const availableInsideUnitedStatesDescription = 'Available only inside of the US';
const availableOutsideUnitedStatesDescription = 'Available only outside of the US';
const availableGloballyDescription = 'Available both inside and outside of the US';

function getProviderAvailability(availableRegions: AvailableRegions) {
  switch (availableRegions) {
    case AvailableRegions.InsideUsa:
      return availableInsideUnitedStatesDescription;
    case AvailableRegions.OutsideUsa:
      return availableOutsideUnitedStatesDescription;
    case AvailableRegions.Global:
      return availableGloballyDescription;
    default:
      return '';
  }
}

interface FiatProviderProps {
  availableRegions: AvailableRegions;
  hasFastCheckoutProcess: boolean;
  hasTradingFees: boolean;
  icon: string;
  onGoToProvider(): void;
  title: string;
}
export const FiatProviderItem = (props: FiatProviderProps) => {
  const { availableRegions, hasFastCheckoutProcess, hasTradingFees, icon, onGoToProvider, title } =
    props;

  const Attributes = (
    <>
      {hasFastCheckoutProcess && <FastCheckoutBadge />}
      {!hasTradingFees && <ZeroPercentFeesBadge />}
    </>
  );

  return (
    <FundAccountTile
      attributes={Attributes}
      description={getProviderAvailability(availableRegions)}
      icon={icon}
      onClickTile={onGoToProvider}
      testId={FundPageSelectors.FiatProviderItem}
      title={title}
    />
  );
};
