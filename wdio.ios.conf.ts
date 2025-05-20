export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  hostname: '192.168.64.24',
  port: 4723,
  path: '/',

  specs: ['./test/**/specs/**/*.ts'],
  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      platformName: 'iOS',

      'appium:platformVersion': '17.0.3',
      'appium:automationName': 'XCUITest',
      'appium:udid': '00008101-001C29560E45001E',
      'appium:bundleId': 'com.burbn.instagram',
    },
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  afterTest: async function () {
    try {
      await browser.terminateApp('com.burbn.instagram', { timeout: 1000 });
      await browser.activateApp('com.burbn.instagram');

      console.log('App reset to initial state');
    } catch (error) {
      console.error('Error during app reset:', error);
    }
  },
};
