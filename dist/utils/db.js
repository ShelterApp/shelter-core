'use strict';

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

/**
 * Replace native mongoose's `timestamps` with additional `deletedAt` field
 * @param schema Mongoose Schema
 * @param _ Options
 */
var timestampsPlugin = function (schema, _) {
    // custom fields
    schema.add({
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    });
    // remove private fields on toJSON
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (_, ret) { return (__assign(__assign({}, ret), { _id: undefined, deletedAt: undefined })); },
    });
    // attach conditions on find hooks
    var hooks = {
        query: function () {
            this.where({
                deletedAt: { $exists: false },
            });
        },
    };
    [
        'count',
        'countDocuments',
        'find',
        'findOne',
        'findOneAndRemove',
        'findOneAndUpdate',
        'update',
        'updateOne',
        'updateMany',
    ].forEach(function (method) { return schema.pre(method, hooks.query); });
    // custom methods with fields injected on create, update & delete
    // tslint:disable-next-line: no-object-mutation
    Object.assign(schema.methods, {
        $create: function () {
            this.set({
                createdAt: Date.now(),
            });
            return this.save();
        },
        $update: function (changes) {
            this.set(__assign(__assign({}, changes), { updatedAt: Date.now() }));
            return this.save();
        },
        $delete: function () {
            this.set({
                deletedAt: Date.now(),
            });
            return this.save();
        },
    });
};

var user = process.env.MONGO_USER;
var password = process.env.MONGO_PASSWORD;
var host = process.env.MONGO_HOST || 'localhost';
var port = +(process.env.MONGO_PORT || 0) || 27017;
var dbName = process.env.MONGO_DB_NAME || 'things';
var uri = user && password
    ? "mongodb+srv://" + user + ":" + password + "@" + host + "/" + dbName + "?retryWrites=true&w=majority"
    : "mongodb://" + host + ":" + port + "/" + dbName;
var connect = function (_a) {
    var mongoose = _a.mongoose, _b = _a.options, options = _b === void 0 ? {} : _b, _c = _a.cb, cb = _c === void 0 ? function () { } : _c;
    var timestampsPluginFlag = options.timestampsPlugin, connectionOptions = __rest(options, ["timestampsPlugin"]);
    if (timestampsPluginFlag) {
        mongoose.plugin(timestampsPlugin);
    }
    mongoose.connection.on('connected', function () {
        logger.info('> MongoDB connected');
    });
    mongoose.connection.on('error', function (err) {
        mongoose.disconnect();
        logger.info('> MongoDB failed to start');
        errorHandler.handle(err);
    });
    mongoose.connect(uri, __assign({ useNewUrlParser: true, promiseLibrary: Promise }, connectionOptions)).then(cb);
};
var db = { connect: connect };

module.exports = db;
//# sourceMappingURL=db.js.map
