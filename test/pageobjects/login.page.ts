import { $ } from "@wdio/globals";
import { expect } from "@wdio/globals";
import Page from "./page";

const locators = {
  createNewAccountButton:
    '//android.widget.Button[@content-desc="Log into another account"]',
  usernameInputField:
    '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.EditText',
  passwordInputField:
    '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.EditText',
  loginPlaceholder:
    '//android.view.View[@content-desc="Username, email or mobile number"]',
  passwordPlaceholder: '//android.view.View[@content-desc="Password"]',
};

class LoginPage extends Page {
  public async clickCreateNewAccountButton(): Promise<void> {
    const button = await $(locators.createNewAccountButton);

    const exists = await button.waitForExist({ timeout: 10000 });
    if (!exists) {
      const pageSource = await driver.getPageSource();
      console.error("Create New Account button NOT found on the page!");
      console.error("Page source snapshot:\n", pageSource);

      await driver.saveScreenshot("./screenshots/no_button_found.png");

      throw new Error(
        "Create New Account button not found after waiting 10 seconds"
      );
    }

    await button.click();
  }

  public async enterUserNameInputField(value: string): Promise<void> {
    const inputField = $(locators.usernameInputField);
    await inputField.waitForDisplayed();
    await inputField.setValue(value);
  }

  public async checkPlaceholder(
    locator: string,
    attribute: string,
    expectedValue: string
  ): Promise<void> {
    const element = $(locator);
    await element.waitForDisplayed();
    const actualValue = await element.getAttribute(attribute);
    expect(actualValue).toBe(expectedValue);
  }

  public async enterPaswwordInputField(value: string): Promise<void> {
    const inputField = $(locators.passwordInputField);
    await inputField.waitForDisplayed();
    await inputField.setValue(value);
  }
}

export default new LoginPage();
export { locators };
