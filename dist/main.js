"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var router_1 = require("./router/router");
var router = new router_1.Router();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var server = http_1.createServer((function (request, response) {
    router.route(request, response);
}));
server.listen(9000);
