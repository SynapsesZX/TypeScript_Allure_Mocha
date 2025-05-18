type Platform = "android" | "ios";

export interface Locators {
  android: Record<string, string>;
  ios: Record<string, string>;
}

export default abstract class BasePage {
  protected platform: Platform;
  protected abstract locators: Locators;

  constructor() {
    this.platform = driver.isAndroid ? "android" : "ios";
  }

  protected getLocator(
    key: keyof typeof this.locators.android | keyof typeof this.locators.ios
  ): string {
    return this.locators[this.platform][key as string];
  }

  public async clickElement(
    key: keyof typeof this.locators.android | keyof typeof this.locators.ios,
    timeout = 10000
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

  public async enterData(
    key: keyof typeof this.locators.android | keyof typeof this.locators.ios,
    value: string,
    timeout = 10000
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

  public async assertAttributeValue(
    key: keyof typeof this.locators.android | keyof typeof this.locators.ios,
    expectedValue: string,
    timeout = 20000,
    attribute?: string
  ): Promise<void> {
    const locator = this.getLocator(key);
    const resolvedAttribute =
      attribute || (this.platform === "ios" ? "label" : "text");
    try {
      const element = $(locator);
      await element.waitForDisplayed({ timeout });
      const actualValue = await element.getAttribute(resolvedAttribute);
      expect(actualValue).toBe(expectedValue);
    } catch (error) {
      throw new Error(
        `Failed to assert attribute "${resolvedAttribute}" on element: ${locator}. Expected: "${expectedValue}". Error: ${error}`
      );
    }
  }
}
