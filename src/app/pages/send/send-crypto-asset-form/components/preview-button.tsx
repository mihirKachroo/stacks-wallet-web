import { Button, ButtonProps } from '@stacks/ui';
import { SendCryptoAssetSelectors } from '@tests/selectors/send.selectors';
import { useFormikContext } from 'formik';

export function PreviewButton(props: ButtonProps) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      borderRadius="10px"
      data-testid={SendCryptoAssetSelectors.PreviewSendTxBtn}
      height="48px"
      onClick={handleSubmit}
      width="100%"
      {...props}
    >
      Preview
    </Button>
  );
}
