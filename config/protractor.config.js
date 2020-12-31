/* eslint-disable no-nested-ternary, no-param-reassign, valid-typeof, no-multi-assign, func-names, no-console */
const argv = require('minimist')(process.argv.slice(2));
const pkgJson = require('./package.json');
const SpecReporter = require('jasmine-spec-reporter');

const PORT = argv.port ||
  (pkgJson.config ? pkgJson.config.port ? pkgJson.config.port : null : null) ||
  8080;
const BASE_URL = argv['base-url'] || 'http://localhost';

console.log(`Running Tests at: ${BASE_URL}:${PORT}`);

const e2eTests = ['test/e2e/**/*.spec.js'];

const config = {
  specs: e2eTests,
  framework: 'jasmine2',
  chromeDriver: './node_modules/chromedriver/lib/chromedriver/chromedriver',
  onPrepare() {
    browser.ignoreSynchronization = true;

    global.goToUrl = function(relativeUrl, baseUrl, port) {
      baseUrl = typeof baseUrl === null ? BASE_URL : baseUrl;
      port = typeof port === null ? PORT : port;
      return browser.get(`${baseUrl}:${port}${relativeUrl}`);
    };

    global.waitUntilIsElementPresent = function(element, timeout) {
      timeout = typeof timeout !== null ? timeout : 6000;
      return browser.driver.wait(
        () => browser.driver.isElementPresent(element),
        timeout,
      );
    };

    jasmine.getEnv().addReporter(new SpecReporter());
  },
};

if (process.env.TRAVIS) {
  config.capabilities = {
    name: pkgJson.name + process.env.TRAVIS_NODE_VERSION,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    browserName: 'chrome',
    chromedriverVersion: '2.0',
    seleniumVersion: '2.0.0',
  };
}

module.exports.config = (exports.config = config);
