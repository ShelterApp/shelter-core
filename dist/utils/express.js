'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var httpStatusCodes = require('http-status-codes');

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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

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

var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log.apply(console, __spreadArrays(["LOG:" + Date.now()], args));
};
var info = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.info.apply(console, __spreadArrays(["INF:" + Date.now()], args));
};
var error = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.error.apply(console, __spreadArrays(["ERR:" + Date.now()], args));
};
var logger = { log: log, info: info, error: error };

/**
 * Log error to destination then exit the process if programmer error
 * @param err error to be handled
 */
var handle = function (err) {
    // TODO
    // E.g. log to sentry
    // E.g. log to console
    logger.error(err);
    if (!err.operational) {
        logger.info('> App exited!');
        process.exit(1);
    }
};
var errorHandler = { handle: handle };

var DEFAULT_QUERY = {
    select: [],
    populate: [],
};
var DEFAULT_LIST_QUERY = {
    query: {},
    select: [],
    populate: [],
    sort: 'createdAt',
    skip: 0,
    limit: 25,
};
var parseSearchQuery = function (searchBy, keyword) {
    if (!searchBy.trim() || !keyword.trim()) {
        return {};
    }
    var query = searchBy.trim().split(',').reduce(function (prev, key) {
        var _a;
        return !key.trim() ? prev : prev.concat((_a = {},
            _a[key.trim()] = new RegExp(keyword.trim(), 'gi'),
            _a));
    }, []);
    if (query.length === 0) {
        return {};
    }
    return query.length === 1 ? query[0] : { $or: query };
};
var parseFilterQuery = function (filterBy, values) {
    if (!filterBy.trim()) {
        return {};
    }
    return filterBy.trim().split(',').reduce(function (prev, key) {
        var _a, _b, _c;
        if (!key || !key.trim()) {
            return prev;
        }
        if (!values[key.trim()].trim()) {
            return __assign(__assign({}, prev), { $or: __spreadArrays((prev['$or'] || []), [
                    (_a = {}, _a[key.trim()] = { $exists: false }, _a),
                    (_b = {}, _b[key.trim()] = null, _b),
                ]) });
        }
        var valuesArray = values[key.trim()].trim().split(',');
        return __assign(__assign({}, prev), (_c = {}, _c[key.trim()] = valuesArray.length === 1
            ? valuesArray[0]
            : { $in: valuesArray.map(function (v) { return v.trim(); }) }, _c));
    }, {});
};
var parseSelect = function (select) {
    return select.split(',').filter(function (item) { return !!item; });
};
var parsePopulate = function (populate) {
    return populate.split(',').filter(function (item) { return !!item; });
};
var parseSort = function (sort, direction) {
    return direction === 'desc' ? "-" + sort.trim() : sort.trim();
};
var parseQuery = function (_a) {
    var _b = _a.select, select = _b === void 0 ? '' : _b, _c = _a.populate, populate = _c === void 0 ? '' : _c;
    return ({
        select: parseSelect(select),
        populate: parsePopulate(populate),
    });
};
var parseListQuery = function (_a) {
    var _b = _a.search, search = _b === void 0 ? '' : _b, _c = _a.q, q = _c === void 0 ? '' : _c, _d = _a.filter, filter = _d === void 0 ? '' : _d, _e = _a.select, select = _e === void 0 ? '' : _e, _f = _a.populate, populate = _f === void 0 ? '' : _f, _g = _a.sort, sort = _g === void 0 ? 'createdAt' : _g, _h = _a.direction, direction = _h === void 0 ? 'asc' : _h, _j = _a.skip, skip = _j === void 0 ? 0 : _j, _k = _a.limit, limit = _k === void 0 ? 25 : _k, filterValues = __rest(_a, ["search", "q", "filter", "select", "populate", "sort", "direction", "skip", "limit"]);
    var _l = parseSearchQuery(search, q), searchOr = _l.$or, searchQuery = __rest(_l, ["$or"]);
    var _m = parseFilterQuery(filter, filterValues), filterOr = _m.$or, filterQuery = __rest(_m, ["$or"]);
    var $and = []; // tslint:disable-line: readonly-array
    if (searchOr) {
        $and.push({ $or: searchOr });
    }
    if (filterOr) {
        $and.push({ $or: filterOr });
    }
    return {
        query: __assign(__assign(__assign({}, searchQuery), filterQuery), ($and.length > 0 ? { $and: $and } : {})),
        select: parseSelect(select),
        populate: parsePopulate(populate),
        sort: parseSort(sort, direction),
        skip: +skip,
        limit: +limit,
    };
};
// ---------------------------------------------------
// -----------------Express Middleware----------------
// ---------------------------------------------------
/**
 * Parse request's query to the mongoose compatible query
 * @param req Express Request object
 * @param _ Express Response object
 * @param next Express Next function
 */
var parseQueryMiddleware = function (req, _, next) {
    try {
        var myQuery = parseQuery(req.query);
        Object.assign(req, { myQuery: myQuery }); // tslint:disable-line: no-object-mutation
        next();
    }
    catch (err) {
        next(new HttpError(httpStatusCodes.BAD_REQUEST, err));
    }
};
/**
 * Parse request's query to the mongoose compatible query
 * @param req Express Request object
 * @param _ Express Response object
 * @param next Express Next function
 */
var parseListQueryMiddleware = function (req, _, next) {
    try {
        var myQuery = parseListQuery(req.query);
        Object.assign(req, { myQuery: myQuery }); // tslint:disable-line: no-object-mutation
        next();
    }
    catch (err) {
        next(new HttpError(httpStatusCodes.BAD_REQUEST, err));
    }
};
/**
 * An Express RequestHandler wrapper that throws error if invalid,
 * otherwise parses the request's body to the desired one
 * @param validate Validation function
 */
var validateBody = function (validate) {
    return function (req, _, next) {
        try {
            var myBody = validate(req.body);
            Object.assign(req, { myBody: myBody }); // tslint:disable-line: no-object-mutation
            next();
        }
        catch (err) {
            next(new HttpError(httpStatusCodes.BAD_REQUEST, err));
        }
    };
};
/**
 * An Express RequestHandler that handles the 404 Not Found error
 * @param _ Express Request object
 * @param __ Express Response object
 * @param next Express Next function
 */
var handleNotFound = function (_, __, next) {
    next(new HttpError(httpStatusCodes.NOT_FOUND, 'Resource not found'));
};
/**
 * An Express RequestHandler that responses error info to the client
 * @param err Http Error object
 * @param _ Express Request object
 * @param res Express Response object
 * @param __ Express Next function
 */
var handleErrors = function (err, _, res, __) {
    errorHandler.handle(err);
    res.status(err.code).send(err);
};

exports.DEFAULT_LIST_QUERY = DEFAULT_LIST_QUERY;
exports.DEFAULT_QUERY = DEFAULT_QUERY;
exports.handleErrors = handleErrors;
exports.handleNotFound = handleNotFound;
exports.parseListQuery = parseListQuery;
exports.parseListQueryMiddleware = parseListQueryMiddleware;
exports.parseQuery = parseQuery;
exports.parseQueryMiddleware = parseQueryMiddleware;
exports.validateBody = validateBody;
//# sourceMappingURL=express.js.map
