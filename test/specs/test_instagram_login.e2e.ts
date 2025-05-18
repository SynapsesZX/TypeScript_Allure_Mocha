import { LoginPage } from "../pageobjects/login.page";
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Instagram Login Screen ", () => {
  const loginpage = new LoginPage();
  it("[@regression] Check login with invalid credentials", async () => {
    await loginpage.clickElement("createNewAccountButton");
    await loginpage.enterData("mobileNumberInputField", "454545");
  });

  it("[@regression] Check No account found login with invalid credentials from log into another account", async () => {
    await loginpage.clickElement("loginFromAnotherAccountButton");
    await loginpage.assertAttributeValue(
      "loginPlaceholder",
      "Username, email or mobile number",
      10000,
      "text"
    );
    await loginpage.enterData("usernameInputField", "e");
    await loginpage.assertAttributeValue(
      "passwordPlaceholder",
      "Password",
      10000,
      "text"
    );
    await loginpage.enterData("passwordInputField", "1");
    await loginpage.clickElement("loginButton");
    await loginpage.assertAttributeValue(
      "noAccountFoundLabel",
      "No account found",
      20000,
      "text"
    );

    await wait(5000);
  });
});
