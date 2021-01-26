'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var platformService = require('@airslate/platform-service');
var platformTracing = require('@airslate/platform-tracing');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var platformService__default = /*#__PURE__*/_interopDefaultLegacy(platformService);
var platformTracing__default = /*#__PURE__*/_interopDefaultLegacy(platformTracing);

const sdk = () => {
  console.log('sdk123');

  console.log('beta test 888');
};

Object.defineProperty(exports, 'service', {
  enumerable: true,
  get: function () {
    return platformService__default['default'];
  }
});
Object.defineProperty(exports, 'tracing', {
  enumerable: true,
  get: function () {
    return platformTracing__default['default'];
  }
});
exports.sdk = sdk;
