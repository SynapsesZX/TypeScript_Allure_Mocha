import BasePage, { Locators } from './base.page';

const locators: Locators = {
  android: {
    createNewAccountButton: '//android.view.View[@content-desc="Create new account"]',

    loginFromAnotherAccountButton:
      'android=new UiSelector().description("Log into another account")',
    usernameInputField:
      '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.EditText',
    passwordInputField:
      '//android.widget.FrameLayout[@resource-id="com.instagram.android:id/layout_container_main"]/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.EditText',
    loginPlaceholder: '//android.view.View[@content-desc="Username, email or mobile number"]',
    passwordPlaceholder: '//android.view.View[@content-desc="Password"]',
    mobileNumberInputField: 'android=new UiSelector().className("android.widget.EditText")',
    loginButton: 'android=new UiSelector().description("Log in")',
    cantFindAccountLabel: 'android=new UiSelector().text("Can\'t find account")',
    noAccountFoundLabel: 'android=new UiSelector().text("No account found")',
  },
  ios: {
    createNewAccountButton: 'skip',

    loginFromAnotherAccountButton: '~I already have an account',
    usernameInputField: '~Username, email address or mobile number',
    passwordInputField: '~Password',
    loginPlaceholder: '~Username, email address or mobile number',
    passwordPlaceholder: '~Password',
    mobileNumberInputField: 'skip',
    loginButton: '~Log in',
    cantFindAccountLabel: '//XCUIElementTypeStaticText[@name="No account found"]',
    noAccountFoundLabel: '//XCUIElementTypeStaticText[@name="No account found"]',
  },
};

class LoginPage extends BasePage {
  protected locators = locators;
}

export { LoginPage };
