import { $ } from "@wdio/globals";
import { expect } from "@wdio/globals";
import Page from "./page";

const locators = {
  createNewAccountButton:
    '//android.view.View[@content-desc="Create new account"]',

  loginFromAnotherAccountButton:
    'android=new UiSelector().description("Log into another account")',
  usernameInputField:
    '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.EditText',
  passwordInputField:
    '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.EditText',
  loginPlaceholder:
    '//android.view.View[@content-desc="Username, email or mobile number"]',
  passwordPlaceholder: '//android.view.View[@content-desc="Password"]',
  mobileNumberInputField:
    'android=new UiSelector().className("android.widget.EditText")',
  loginButton: 'android=new UiSelector().description("Log in")',
  cantFindAccountLabel: 'android=new UiSelector().text("Can\'t find account")',
  noAccountFoundLabel: 'android=new UiSelector().text("No account found")',
};

class LoginPage extends Page {
  public async clickElement(
    locator: string,
    timeout: number = 10000
  ): Promise<void> {
    try {
      const button = $(locator);
      await button.waitForDisplayed({ timeout });
      await button.click();
    } catch (error) {
      throw new Error(`Cannot click the element: ${locator}. Error: ${error}`);
    }
  }

  public async enterData(
    locator: string,
    value: string,
    timeout: number = 10000
  ): Promise<void> {
    try {
      const inputField = $(locator);
      await inputField.waitForDisplayed({ timeout });
      await inputField.setValue(value);
    } catch (error) {
      throw new Error(`Cannot enter the data in: ${locator}. Error: ${error}`);
    }
  }

  public async assertAttributeValue(
    locator: string,
    attribute: string,
    expectedValue: string,
    timeout: number = 20000
  ): Promise<void> {
    try {
      const element = $(locator);
      await element.waitForDisplayed({ timeout });
      const actualValue = await element.getAttribute(attribute);
      expect(actualValue).toBe(expectedValue);
    } catch (error) {
      throw new Error(
        `Failed to assert attribute "${attribute}" on element: ${locator}. Expected: "${expectedValue}". Error: ${error}`
      );
    }
  }
}

export default new LoginPage();
export { locators };
