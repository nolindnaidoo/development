import { jsdom } from 'jsdom';
import fs from 'fs';

// Expose DOM for React
const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
global.document = jsdom(indexHtml, {
  url: `http://localhost`
});
global.window = document.defaultView;
global.navigator = { userAgent: 'node.js' };

// material-ui stub
window.getSelection = () => ({ removeAllRanges: Function.prototype });

// React-MDL stubs
window.componentHandler = window.componentHandler || {};
window.componentHandler.upgradeElement = Function.prototype;
window.componentHandler.upgradeElements = Function.prototype;
window.componentHandler.register = Function.prototype;
global.componentHandler = window.componentHandler;
delete window.CustomEvent;
