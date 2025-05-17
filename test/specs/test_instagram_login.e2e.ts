import { locators } from "../pageobjects/login.page";
import LoginPage from "../pageobjects/login.page";
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Instagram Login Screen ", () => {
  it("[@regression] Check login with invalid credentials", async () => {
    await LoginPage.clickElement(locators.createNewAccountButton);
    await LoginPage.enterData(locators.mobileNumberInputField, "454545");
  });

  it("[@regression] Check No account found login with invalid credentials from log into another account", async () => {
    await LoginPage.clickElement(locators.loginFromAnotherAccountButton);
    await LoginPage.assertAttributeValue(
      locators.loginPlaceholder,
      "text",
      "Username, email or mobile number"
    );
    await LoginPage.enterData(locators.usernameInputField, "e");
    await LoginPage.assertAttributeValue(
      locators.passwordPlaceholder,
      "text",
      "Password"
    );
    await LoginPage.enterData(locators.passwordInputField, "1");
    await LoginPage.clickElement(locators.loginButton);
    await LoginPage.assertAttributeValue(
      locators.noAccountFoundLabel,
      "text",
      "No account found",
      20000
    );

    await wait(5000);
  });
});
