import { $ } from "@wdio/globals";
import { expect } from "@wdio/globals";
import Page from "./page";

const locators = {
  createNewAccountButton:
    '//android.widget.Button[@content-desc="Войти в другой аккаунт"]',
  usernameInputField:
    '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.EditText',
  passwordInputField:
    '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.EditText',
  loginPlaceholder:
    '//android.view.View[@content-desc="Имя пользователя, эл. адрес или мобильный телефон"]',
  passwordPlaceholder: '//android.view.View[@content-desc="Пароль"]',
};

class LoginPage extends Page {
  public async clickCreateNewAccountButton(): Promise<void> {
    const button = $(locators.createNewAccountButton);
    await button.waitForDisplayed({ timeout: 10000 });
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
