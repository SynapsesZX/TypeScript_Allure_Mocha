import { locators } from "../pageobjects/login.page";
import LoginPage from "../pageobjects/login.page";
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Instagram Login Screen ", () => {
  it("Check login with invalid credentials", async () => {
    await LoginPage.clickCreateNewAccountButton();
    await LoginPage.enterMobileNumberInputField("454545");

    await wait(5000);
  });
});
