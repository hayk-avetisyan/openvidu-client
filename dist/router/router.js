"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var routes_1 = require("./routes");
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.prototype.route = function (request, response) {
        var status = false;
        Router.prepareResponse(request, response);
        if (request.url && request.method) {
            var path = Object.getOwnPropertyNames(routes_1.routes).find(function (url) { var _a; return ((_a = request.url) === null || _a === void 0 ? void 0 : _a.match(url)) != null; });
            if (path) {
                var controller = routes_1.routes[path][request.method];
                if (controller) {
                    controller(request, response);
                    status = true;
                }
            }
        }
        if (!status) {
            response.statusCode = 404;
            response.end();
        }
    };
    Router.prepareResponse = function (request, response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Content-Type", "application/json");
    };
    return Router;
}());
exports.Router = Router;
