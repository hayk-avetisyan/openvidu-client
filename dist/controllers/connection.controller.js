"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionController = void 0;
var utils_1 = require("../utils");
var request_1 = require("../openvidu/request");
var ConnectionController = /** @class */ (function () {
    function ConnectionController() {
    }
    ConnectionController.create = function (request, response) {
        utils_1.readRequestBody(request, function (data) {
            new request_1.Request()
                .setPath("sessions/" + data.roomId + "/connection")
                .setMethod("POST")
                .setDataProperty("role", utils_1.roleName(data.role))
                .request().
                subscribe({
                next: function (connection) {
                    response.write(utils_1.toJson(connection.data));
                    response.end();
                },
                error: function (error) {
                    console.log("error");
                }
            });
        });
    };
    return ConnectionController;
}());
exports.ConnectionController = ConnectionController;
