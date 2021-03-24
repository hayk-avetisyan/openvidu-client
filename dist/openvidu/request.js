"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
var rxjs_1 = require("rxjs");
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("../utils");
var Request = /** @class */ (function () {
    function Request() {
        this.domain = "https://127.0.0.1:8091/openvidu/api/";
        this.path = "";
        this.method = "GET";
        this.headers = {};
        this.data = {};
        this.setHeader("Authorization", "Basic T1BFTlZJRFVBUFA6SGVsbG8=");
        this.setHeader("Content-Type", "application/json");
    }
    Request.prototype.setPath = function (path) {
        this.path = path;
        return this;
    };
    Request.prototype.setMethod = function (method) {
        this.method = method;
        return this;
    };
    Request.prototype.setHeader = function (key, value) {
        this.headers[key] = value;
        return this;
    };
    Request.prototype.setHeaders = function (headers) {
        Object.assign(this.headers, headers);
        return this;
    };
    Request.prototype.setData = function (data) {
        Object.assign(this.data, data);
        return this;
    };
    Request.prototype.setDataProperty = function (key, value) {
        this.data[key] = value;
        return this;
    };
    Request.prototype.request = function () {
        var config = {
            baseURL: this.domain,
            url: this.path,
            method: this.method,
            headers: this.headers,
            data: utils_1.toJson(this.data)
        };
        return new rxjs_1.Observable(function (observer) {
            axios_1.default.request(config).then(function (response) {
                try {
                    response.data = utils_1.fromJson(response.data);
                }
                catch (_a) { }
                observer.next(response);
                observer.complete();
            }, function (reject) {
                observer.error(reject);
            }).catch(function (error) {
                observer.error(error);
            });
        });
    };
    return Request;
}());
exports.Request = Request;
