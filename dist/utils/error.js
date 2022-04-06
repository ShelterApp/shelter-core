'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * Check if the current environment is development
 * @returns boolean
 */
var isDev = function () {
    return ['test', 'staging', 'production'].indexOf(process.env.NODE_ENV) === -1;
};

var MyError = /** @class */ (function (_super) {
    __extends(MyError, _super);
    function MyError(err, operational) {
        if (operational === void 0) { operational = false; }
        var _this = _super.call(this) || this;
        _this.name = err instanceof Error ? err.name : 'Error';
        _this.message = err instanceof Error ? err.message : err;
        _this.operational = operational;
        return _this;
    }
    return MyError;
}(Error));
/**
 * HttpError that takes the first parameter as an Http Status Code
 */
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(code, err) {
        var _this = _super.call(this, err, true) || this;
        _this.code = code;
        _this.name = 'HttpError';
        return _this;
    }
    HttpError.prototype.toJSON = function () {
        var content = {
            code: this.code,
            message: this.message,
        };
        return !isDev() ? content : __assign(__assign({}, content), { error: this.stack });
    };
    return HttpError;
}(MyError));

exports.HttpError = HttpError;
exports.MyError = MyError;
//# sourceMappingURL=error.js.map
