/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
// import { Provider } from 'react-redux';

// import store from './store';
import router from './router';
import history from './history';

let routes = require('./routes.json'); // Loaded with utils/routes-loader.js

const container = document.getElementById('container');

function renderComponent(component) {
  ReactDOM.render(component, container);
}

// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routes.json, core/router.js)
function render(location, action) {
  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => router.resolve(routes, { ...location, error }).then(renderComponent));
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
history.listen(render);
render(history.location, history.action);

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes.json', () => {
    // eslint-disable-next-line global-require, import/newline-after-import
    routes = require('./routes.json');
    render(history.location, history.action);
  });
}
