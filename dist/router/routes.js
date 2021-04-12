"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var session_controller_1 = require("../controllers/session.controller");
var connection_controller_1 = require("../controllers/connection.controller");
exports.routes = {
    "/session/create": {
        "POST": session_controller_1.SessionController.create,
    },
    "/connection/create": {
        "POST": connection_controller_1.ConnectionController.create,
        "OPTIONS": connection_controller_1.ConnectionController.options,
    }
};
