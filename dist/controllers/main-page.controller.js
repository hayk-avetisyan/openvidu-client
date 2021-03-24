"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPageController = void 0;
var MainPageController = /** @class */ (function () {
    function MainPageController() {
    }
    MainPageController.hello = function (request, response) {
        response.write("Hello world");
        response.end();
    };
    return MainPageController;
}());
exports.MainPageController = MainPageController;
