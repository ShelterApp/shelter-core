'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Check if the current environment is development
 * @returns boolean
 */
var isDev = function () {
    return ['test', 'staging', 'production'].indexOf(process.env.NODE_ENV) === -1;
};
var isTest = function () {
    return process.env.NODE_ENV === 'test';
};
var isStaging = function () {
    return process.env.NODE_ENV === 'staging';
};
var isProduction = function () {
    return process.env.NODE_ENV === 'production';
};

exports.isDev = isDev;
exports.isProduction = isProduction;
exports.isStaging = isStaging;
exports.isTest = isTest;
//# sourceMappingURL=index.js.map
