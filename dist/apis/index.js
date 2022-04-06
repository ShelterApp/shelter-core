'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fetch = _interopDefault(require('isomorphic-unfetch'));
var qs = require('qs');

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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __SHELTER_API_CONFIG__ = {}; // tslint:disable-line: no-let
function getConfig() {
    return __assign({}, __SHELTER_API_CONFIG__);
}
function setConfig(cfg) {
    if (cfg === void 0) { cfg = {}; }
    __SHELTER_API_CONFIG__ = __assign({}, cfg);
}

var Method;
(function (Method) {
    Method["Get"] = "GET";
    Method["Post"] = "POST";
    Method["Put"] = "PUT";
    Method["Patch"] = "PATCH";
    Method["Delete"] = "DELETE";
})(Method || (Method = {}));
function resolveUrl(url, queryParams) {
    if (queryParams) {
        return "" + url + qs.stringify(queryParams, { addQueryPrefix: true });
    }
    return url;
}
function resolveBody(method, body) {
    if ([Method.Post, Method.Put, Method.Patch].includes(method) && body) {
        return JSON.stringify(body);
    }
    return undefined;
}
function request(request) {
    return __awaiter(this, void 0, void 0, function () {
        var url, method, queryParams, body, token, defaultHeader, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = request.url, method = request.method, queryParams = request.queryParams, body = request.body, token = request.token;
                    defaultHeader = {
                        'Content-Type': 'application/json',
                    };
                    return [4 /*yield*/, fetch(resolveUrl(url, queryParams), {
                            method: method,
                            // credentials: 'include',
                            headers: token ? __assign(__assign({}, defaultHeader), { Authorization: "Bearer " + token }) : defaultHeader,
                            body: resolveBody(method, body),
                        })];
                case 1:
                    res = _a.sent();
                    if (!!res.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, res.json()];
                case 2: throw _a.sent();
                case 3: return [4 /*yield*/, res.json()];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function $get(data) {
    return request(__assign(__assign({}, data), { method: Method.Get }));
}
function $post(data) {
    return request(__assign(__assign({}, data), { method: Method.Post }));
}
function $put(data) {
    return request(__assign(__assign({}, data), { method: Method.Put }));
}
function $delete(data) {
    return request(__assign(__assign({}, data), { method: Method.Delete }));
}

function getBaseUrl() {
    return getConfig().shelterApiUrl + "/auth";
}
function signUp(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/sign-up",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function signIn(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/sign-in",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function signInWithGoogle() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        url: getBaseUrl() + "/google",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function signInWithFacebook() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        url: getBaseUrl() + "/facebook",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function signOut() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $delete({
                        url: getBaseUrl() + "/sign-in",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function verifyAccessToken(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/verify-access-token",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function createPassword(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/password",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function updatePassword(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $put({
                        url: getBaseUrl() + "/password",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function requestResetPassword(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/request-reset-password",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getUserProfile(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl() + "/profile",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function updateUserProfile(payload) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $put({
                        url: getBaseUrl() + "/profile",
                        body: payload,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addFavoriteEvent(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/add-favorite-service",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function removeFavoriteEvent(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/remove-favorite-service",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function registerDevice(payload) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/register-device",
                        body: payload,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function delDevice(payload) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/remove-device",
                        body: payload,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function reportNotifications() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl() + "/report-notifications",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var auth = {
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    createPassword: createPassword,
    updatePassword: updatePassword,
    requestResetPassword: requestResetPassword,
    getUserProfile: getUserProfile,
    updateUserProfile: updateUserProfile,
    addFavoriteEvent: addFavoriteEvent,
    removeFavoriteEvent: removeFavoriteEvent,
    signInWithGoogle: signInWithGoogle,
    signInWithFacebook: signInWithFacebook,
    verifyAccessToken: verifyAccessToken,
    registerDevice: registerDevice,
    delDevice: delDevice,
    reportNotifications: reportNotifications,
};

var auth$1 = /*#__PURE__*/Object.freeze({
    'default': auth,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    createPassword: createPassword,
    updatePassword: updatePassword,
    requestResetPassword: requestResetPassword,
    getUserProfile: getUserProfile,
    updateUserProfile: updateUserProfile,
    addFavoriteEvent: addFavoriteEvent,
    removeFavoriteEvent: removeFavoriteEvent,
    signInWithGoogle: signInWithGoogle,
    signInWithFacebook: signInWithFacebook,
    verifyAccessToken: verifyAccessToken,
    registerDevice: registerDevice,
    delDevice: delDevice,
    reportNotifications: reportNotifications
});



var types = /*#__PURE__*/Object.freeze({

});

function getBaseUrl$1() {
    return getConfig().shelterApiUrl + "/users";
}
function list(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$1(),
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function count(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$1() + "/count",
                    })];
                case 1:
                    count = (_a.sent()).count;
                    return [2 /*return*/, count];
            }
        });
    });
}
function create(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$1(),
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function get(id, queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$1() + "/" + id,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function update(_a) {
    var id = _a.id, data = __rest(_a, ["id"]);
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, $put({
                        url: getBaseUrl$1() + "/" + id,
                        body: data,
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function del(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $delete({
                        url: getBaseUrl$1() + "/" + id,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function togglePerm(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$1() + "/" + id + "/toggle-perm",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function togglePermSupperUser(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$1() + "/" + id + "/toggle-perm-supper-user",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function setPermission(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$1() + "/" + id + "/set-permission",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var users = {
    list: list,
    count: count,
    create: create,
    get: get,
    update: update,
    del: del,
    togglePerm: togglePerm,
    togglePermSupperUser: togglePermSupperUser,
    setPermission: setPermission,
};

var users$1 = /*#__PURE__*/Object.freeze({
    'default': users,
    list: list,
    count: count,
    create: create,
    get: get,
    update: update,
    del: del,
    togglePerm: togglePerm,
    togglePermSupperUser: togglePermSupperUser,
    setPermission: setPermission
});



var types$1 = /*#__PURE__*/Object.freeze({

});

function getBaseUrl$2() {
    return getConfig().shelterApiUrl + "/services";
}
function list$1(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$2(),
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function count$1(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$2() + "/count",
                    })];
                case 1:
                    count = (_a.sent()).count;
                    return [2 /*return*/, count];
            }
        });
    });
}
function create$1(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$2(),
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function get$1(id, queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$2() + "/" + id,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function update$1(_a) {
    var id = _a.id, data = __rest(_a, ["id"]);
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, $put({
                        url: getBaseUrl$2() + "/" + id,
                        body: data,
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function del$1(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $delete({
                        url: getBaseUrl$2() + "/" + id,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function likes(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$2() + "/" + id + "/likes",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function approveServices(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$2() + "/approve-services",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function removeServices(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$2() + "/remove-services",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function listBeds() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        url: getBaseUrl$2() + "/beds",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function updateAvailableBeds(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$2() + "/update-available-beds",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function searchCityOrZip(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$2() + "/search-city-or-zip",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var services = {
    list: list$1,
    count: count$1,
    create: create$1,
    get: get$1,
    update: update$1,
    del: del$1,
    likes: likes,
    approveServices: approveServices,
    removeServices: removeServices,
    listBeds: listBeds,
    updateAvailableBeds: updateAvailableBeds,
    searchCityOrZip: searchCityOrZip,
};

var services$1 = /*#__PURE__*/Object.freeze({
    'default': services,
    list: list$1,
    count: count$1,
    create: create$1,
    get: get$1,
    update: update$1,
    del: del$1,
    likes: likes,
    approveServices: approveServices,
    removeServices: removeServices,
    listBeds: listBeds,
    updateAvailableBeds: updateAvailableBeds,
    searchCityOrZip: searchCityOrZip
});



var types$2 = /*#__PURE__*/Object.freeze({

});

function getBaseUrl$3() {
    return getConfig().shelterApiUrl + "/crisis-lines";
}
function list$2(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$3(),
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function count$2(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$3() + "/count",
                    })];
                case 1:
                    count = (_a.sent()).count;
                    return [2 /*return*/, count];
            }
        });
    });
}
function create$2(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$3(),
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function get$2(id, queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$3() + "/" + id,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function update$2(_a) {
    var id = _a.id, data = __rest(_a, ["id"]);
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, $put({
                        url: getBaseUrl$3() + "/" + id,
                        body: data,
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function del$2(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $delete({
                        url: getBaseUrl$3() + "/" + id,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var crisisLines = {
    list: list$2,
    count: count$2,
    create: create$2,
    get: get$2,
    update: update$2,
    del: del$2,
};

var crisisLines$1 = /*#__PURE__*/Object.freeze({
    'default': crisisLines,
    list: list$2,
    count: count$2,
    create: create$2,
    get: get$2,
    update: update$2,
    del: del$2
});



var types$3 = /*#__PURE__*/Object.freeze({

});

function getBaseUrl$4() {
    return getConfig().shelterApiUrl + "/feedbacks";
}
function list$3(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$4(),
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function count$3(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$4() + "/count",
                    })];
                case 1:
                    count = (_a.sent()).count;
                    return [2 /*return*/, count];
            }
        });
    });
}
function createServiceFeedBack(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$4() + "/service",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function createAppFeedback(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$4() + "/app",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function get$3(id, queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$4() + "/" + id,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function archive(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$4() + "/" + id + "/archive",
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function del$3(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $delete({
                        url: getBaseUrl$4() + "/" + id,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var feedbacks = {
    list: list$3,
    count: count$3,
    createServiceFeedBack: createServiceFeedBack,
    createAppFeedback: createAppFeedback,
    get: get$3,
    archive: archive,
    del: del$3,
};

var feedbacks$1 = /*#__PURE__*/Object.freeze({
    'default': feedbacks,
    list: list$3,
    count: count$3,
    createServiceFeedBack: createServiceFeedBack,
    createAppFeedback: createAppFeedback,
    get: get$3,
    archive: archive,
    del: del$3
});



var types$4 = /*#__PURE__*/Object.freeze({

});

function getBaseUrl$5() {
    return getConfig().shelterApiUrl + "/files";
}
function get$4(fileName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        url: getBaseUrl$5() + "/" + fileName,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var files = {
    get: get$4,
};

var files$1 = /*#__PURE__*/Object.freeze({
    'default': files,
    get: get$4
});

function getBaseUrl$6() {
    return getConfig().shelterApiUrl + "/bot";
}
function query(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: getBaseUrl$6() + "/query",
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var bot = {
    query: query,
};

var bot$1 = /*#__PURE__*/Object.freeze({
    'default': bot,
    query: query
});

function getBaseUrl$7() {
    return getConfig().shelterApiUrl + "/static-pages";
}
function list$4(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$7(),
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function count$4(queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$7() + "/count",
                    })];
                case 1:
                    count = (_a.sent()).count;
                    return [2 /*return*/, count];
            }
        });
    });
}
function create$3(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $post({
                        url: "" + getBaseUrl$7(),
                        body: data,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function get$5(code, queryParams) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $get({
                        queryParams: queryParams,
                        url: getBaseUrl$7() + "/" + code,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function update$3(code) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $put({
                        url: getBaseUrl$7() + "/" + code,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function del$4(code) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $delete({
                        url: getBaseUrl$7() + "/" + code,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var staticPages = {
    list: list$4,
    count: count$4,
    create: create$3,
    get: get$5,
    update: update$3,
    del: del$4,
};

var staticPages$1 = /*#__PURE__*/Object.freeze({
    'default': staticPages,
    list: list$4,
    count: count$4,
    create: create$3,
    get: get$5,
    update: update$3,
    del: del$4
});



var types$5 = /*#__PURE__*/Object.freeze({

});

function initApi(cfg) {
    setConfig(cfg);
}

exports.AuthApi = auth$1;
exports.AuthApiTypes = types;
exports.BotApi = bot$1;
exports.CrisisLinesApi = crisisLines$1;
exports.CrisisLinesApiTypes = types$3;
exports.FeedbacksApi = feedbacks$1;
exports.FeedbacksApiTypes = types$4;
exports.FilesApi = files$1;
exports.ServicesApi = services$1;
exports.ServicesApiTypes = types$2;
exports.StaticPagesApi = staticPages$1;
exports.StaticPagesApiTypes = types$5;
exports.UsersApi = users$1;
exports.UsersApiTypes = types$1;
exports.initApi = initApi;
//# sourceMappingURL=index.js.map
