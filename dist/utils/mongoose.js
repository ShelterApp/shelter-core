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

exports.timestampsPlugin = timestampsPlugin;
//# sourceMappingURL=mongoose.js.map
