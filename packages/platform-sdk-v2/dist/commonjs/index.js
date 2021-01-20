'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const service = () => {
    console.log('service');
};

const tracing = () => {
  console.log('tracing');
};

const sdk = () => {
  console.log('sdk');
};

exports.sdk = sdk;
exports.service = service;
exports.tracing = tracing;
