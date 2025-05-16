import { locators } from "../pageobjects/login.page";
import LoginPage from "../pageobjects/login.page";
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Instagram Login Screen ", () => {
  it("Check login with invalid credentials", async () => {
    await LoginPage.clickCreateNewAccountButton();
    await LoginPage.checkPlaceholder(
      locators.loginPlaceholder,
      "text",
      "Username, email or mobile number"
    );
    await LoginPage.enterUserNameInputField("Hello");
    await LoginPage.checkPlaceholder(
      locators.passwordPlaceholder,
      "text",
      "Password"
    );
    await LoginPage.enterPaswwordInputField("gfhjfghj!@43545");

    await wait(5000);
  });
});
