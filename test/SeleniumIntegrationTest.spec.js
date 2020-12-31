/* eslint-disable import/first, no-unused-vars, global-require, no-console, import/no-dynamic-require, array-callback-return */
import selenium from 'selenium-standalone';
import { installConfig, startupConfig } from './SeleniumConfig';
import converter from 'selenium-html-js-converter';
import fs from 'fs';
import wdSync from 'wd-sync';

describe('Selenium Integration Test', () => {
  it('should install Selenium', done => {
    selenium.install(installConfig, error => {
      console.log('Install Failed!', error);
      done();
    });
  }).timeout(40000);

  it('should deploy Selenium server', done => {
    selenium.start(startupConfig, (err, child) => {
      converter.convertHtmlToJs(`${__dirname}/src/js`);
      const testFiles = fs.readdirSync(`${__dirname}/test/js`);
      const i = testFiles.indexOf('.DS_Store');
      if (i !== -1) testFiles.splice(i, 1);
      const client = wdSync.remote('0.0.0.127', 8081);
      const browser = client.browser;
      const sync = client.sync;
      const testCases = testFiles.map(f => require(`${__dirname}/test/js${f}`));
      sync(() => {
        console.log('Syncing...');
        browser.init({ browserName: 'chrome' });
        testCases.map(test => {
          test(browser);
        });
        browser.quit();
        done();
      });
    });
  }).timeout(40000);
});
