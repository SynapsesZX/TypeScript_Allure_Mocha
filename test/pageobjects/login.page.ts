import { $ } from "@wdio/globals";
import { expect } from "@wdio/globals";
import Page from "./page";

const locators = {
  createNewAccountButton: "~Create new account",
  usernameInputField:
    '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.EditText',
  passwordInputField:
    '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.EditText',
  loginPlaceholder:
    '//android.view.View[@content-desc="Username, email or mobile number"]',
  passwordPlaceholder: '//android.view.View[@content-desc="Password"]',
  mobileNumberInputField:
    'android=new UiSelector().className("android.widget.EditText")',
};

class LoginPage extends Page {
  public async clickCreateNewAccountButton(): Promise<void> {
    const button = $(locators.createNewAccountButton);
    await button.waitForDisplayed({ timeout: 10000 });
    await button.click();
  }

  public async enterUserNameInputField(value: string): Promise<void> {
    const inputField = $(locators.usernameInputField);
    await inputField.waitForDisplayed({ timeout: 10000 });
    await inputField.setValue(value);
  }

  public async enterMobileNumberInputField(value: string): Promise<void> {
    const inputField = $(locators.mobileNumberInputField);
    await inputField.waitForDisplayed({ timeout: 10000 });
    await inputField.setValue(value);
  }

  public async checkPlaceholder(
    locator: string,
    attribute: string,
    expectedValue: string
  ): Promise<void> {
    const element = $(locator);
    await element.waitForDisplayed({ timeout: 10000 });
    const actualValue = await element.getAttribute(attribute);
    expect(actualValue).toBe(expectedValue);
  }

  public async enterPaswwordInputField(value: string): Promise<void> {
    const inputField = $(locators.passwordInputField);
    await inputField.waitForDisplayed({ timeout: 10000 });
    await inputField.setValue(value);
  }
}

export default new LoginPage();
export { locators };
