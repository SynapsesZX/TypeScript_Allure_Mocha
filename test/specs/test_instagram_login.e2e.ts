import { LoginPage } from '../pageobjects/login.page';
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Instagram Login Screen ', () => {
  const loginpage = new LoginPage();
  it('[@regression] Check login with invalid credentials', async function () {
    if (browser.isIOS) {
      this.skip();
    }
    await loginpage.clickElement('createNewAccountButton');
    await loginpage.enterData('mobileNumberInputField', '454545');
  });

  it('[@regression] Check No account found login with invalid credentials from log into another account', async () => {
    const loginPlaceholder = browser.isAndroid
      ? 'Username, email or mobile number'
      : 'Username, email address or mobile number';
    const errorHint = browser.isAndroid ? 'No account found' : 'Unable to log in';
    await loginpage.clickElement('loginFromAnotherAccountButton');
    await loginpage.assertAttributeValue('loginPlaceholder', loginPlaceholder, 10000);
    await loginpage.enterData('usernameInputField', 'e');
    await loginpage.assertAttributeValue('passwordPlaceholder', 'Password', 10000);
    await loginpage.enterData('passwordInputField', '1');
    await loginpage.clickElement('loginButton');
    await loginpage.assertAttributeValue('noAccountFoundLabel', errorHint, 20000);

    await wait(5000);
  });
});
