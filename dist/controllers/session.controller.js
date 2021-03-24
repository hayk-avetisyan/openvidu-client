"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
var request_1 = require("../openvidu/request");
var utils_1 = require("../utils");
var SessionController = /** @class */ (function () {
    function SessionController() {
    }
    SessionController.create = function (request, response) {
        utils_1.readRequestBody(request, function (sessionId) {
            new request_1.Request()
                .setPath("sessions")
                .setMethod("POST")
                .setDataProperty("customSessionId", sessionId)
                .request().
                subscribe({
                next: function (session) {
                    response.write(utils_1.toJson("sessionId", session.data.id));
                    response.end();
                },
                error: function (error) {
                    if (error.response.status == 409) {
                        response.write(utils_1.toJson("sessionId", sessionId));
                        response.end();
                    }
                    else {
                        console.log("error");
                    }
                }
            });
        });
    };
    return SessionController;
}());
exports.SessionController = SessionController;
