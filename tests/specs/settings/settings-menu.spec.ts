import { FundPageSelectors } from '@tests/selectors/fund.selectors';
import { SettingsMenuSelectors } from '@tests/selectors/settings.selectors';

import { test } from '../../fixtures/fixtures';

test.describe('settings menu', () => {
  test.beforeEach(async ({ extensionId, globalPage, onboardingPage }) => {
    await globalPage.setupAndUseApiCalls(extensionId);
    await onboardingPage.signUpNewUser();
  });

  test('the correct menu item takes user to support page', async ({ page }) => {
    await page.getByTestId(FundPageSelectors.SkipFundAccountBtn).click();
    await page.getByTestId(SettingsMenuSelectors.SettingsMenuBtn).click();

    const [supportPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByTestId(SettingsMenuSelectors.GetSupportMenuItem).click(),
    ]);

    await test
      .expect(supportPage)
      .toHaveURL(
        'https://wallet.hiro.so/wallet-faq/where-can-i-find-support-for-the-stacks-wallet'
      );
  });
});
