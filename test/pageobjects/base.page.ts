import { it } from 'mocha';

type Platform = 'android' | 'ios';

export interface Locators {
  android: Record<string, string>;
  ios: Record<string, string>;
}

export default abstract class BasePage {
  protected platform: Platform;
  protected abstract locators: Locators;

  constructor() {
    this.platform = driver.isAndroid ? 'android' : 'ios';
  }

  /**
   * Returns the locator based on the current platform
   */
  protected getLocator(key: keyof Locators['android'] | keyof Locators['ios']): string {
    return this.locators[this.platform][key as string];
  }

  /**
   * Clicks an element on the page
   * @param key The locator key
   * @param timeout The timeout for waiting for the element to be displayed
   */
  public async clickElement(
    key: keyof Locators['android'] | keyof Locators['ios'],
    timeout = 10000,
  ): Promise<void> {
    const locator = this.getLocator(key);
    try {
      const element = $(locator);
      await element.waitForDisplayed({ timeout });
      await element.click();
    } catch (error) {
      throw new Error(`Cannot click element: ${locator}. Error: ${error}`);
    }
  }

  /**
   * Enters data into an input field
   * @param key The locator key
   * @param value The value to input
   * @param timeout The timeout for waiting for the element to be displayed
   */
  public async enterData(
    key: keyof Locators['android'] | keyof Locators['ios'],
    value: string,
    timeout = 10000,
  ): Promise<void> {
    const locator = this.getLocator(key);
    try {
      const element = $(locator);
      await element.waitForDisplayed({ timeout });
      await element.setValue(value);
    } catch (error) {
      throw new Error(`Cannot enter data in: ${locator}. Error: ${error}`);
    }
  }

  /**
   * Asserts the value of an attribute of an element
   * @param key The locator key
   * @param expectedValue The expected value of the attribute
   * @param timeout The timeout for waiting for the element to be displayed
   * @param attribute The attribute to check (optional)
   */
  public async assertAttributeValue(
    key: keyof Locators['android'] | keyof Locators['ios'],
    expectedValue: string,
    timeout = 20000,
    attribute?: string,
  ): Promise<void> {
    const locator = this.getLocator(key);
    const resolvedAttribute = attribute || (this.platform === 'ios' ? 'label' : 'text');
    try {
      const element = $(locator);
      await element.waitForDisplayed({ timeout });
      const actualValue = await element.getAttribute(resolvedAttribute);
      expect(actualValue).toBe(expectedValue);
    } catch (error) {
      throw new Error(
        `Failed to assert attribute "${resolvedAttribute}" on element: ${locator}. Expected: "${expectedValue}". Error: ${error}`,
      );
    }
  }

  /**
   * Scrolls to an element on the page
   * @param key The locator key
   * @param timeout The timeout for waiting for the element to be displayed
   */
  public async scrollToElement(
    key: keyof Locators['android'] | keyof Locators['ios'],
    timeout = 10000,
  ): Promise<void> {
    const locator = this.getLocator(key);
    try {
      const element = $(locator);
      await element.waitForDisplayed({ timeout });
      await element.scrollIntoView();
    } catch (error) {
      throw new Error(`Failed to scroll to element: ${locator}. Error: ${error}`);
    }
  }

  /**
   * Checks whether an element is displayed on the page
   * @param key The locator key
   * @param timeout The timeout for waiting for the element to be displayed
   */
  public async isElementDisplayed(
    key: keyof Locators['android'] | keyof Locators['ios'],
    timeout = 10000,
  ): Promise<boolean> {
    const locator = this.getLocator(key);
    try {
      const element = $(locator);
      await element.waitForDisplayed({ timeout });
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Skips the test for a specific platform
   * @param platform The platform to check (e.g., "ios", "android")
   * @param testName The test name
   * @param fn The test function (can be async or sync)
   */
  public skipTestForPlatform(
    platform: Platform,
    testName: string,
    fn: (...args: any[]) => Promise<void> | void,
  ): void {
    if (this.platform === platform) {
      it.skip(testName, fn);
    } else {
      it(testName, fn);
    }
  }
}
