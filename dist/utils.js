"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readRequestBody = exports.roleName = exports.fromJson = exports.toJson = void 0;
var openvidu_node_client_1 = require("openvidu-node-client");
function toJson(key, value) {
    var _a;
    if (value)
        return JSON.stringify((_a = {}, _a[key] = value, _a));
    return key ? JSON.stringify(key) : undefined;
}
exports.toJson = toJson;
function fromJson(data) {
    return JSON.parse(data);
}
exports.fromJson = fromJson;
function roleName(role) {
    switch (role) {
        case "1": {
            return openvidu_node_client_1.OpenViduRole.SUBSCRIBER;
        }
        case "2": {
            return openvidu_node_client_1.OpenViduRole.PUBLISHER;
        }
        case "3": {
            return openvidu_node_client_1.OpenViduRole.MODERATOR;
        }
    }
}
exports.roleName = roleName;
function readRequestBody(request, callback) {
    var body = "";
    request.on('readable', function () {
        body += request.read();
    });
    request.on('end', function () {
        body = body.replace(/null$/, "");
        try {
            callback(fromJson(body));
        }
        catch (_a) {
            callback(body);
        }
    });
}
exports.readRequestBody = readRequestBody;
