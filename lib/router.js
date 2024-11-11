"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var NodeashRoutes = /** @class */ (function () {
    function NodeashRoutes() {
        this.router = (0, express_1.Router)();
    }
    NodeashRoutes.prototype.initializeRoutes = function (parentRoute, controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            var method = controller.method, endpoint = controller.endpoint, handler = controller.handler, middleware = controller.middleware;
            // Apply middleware for this controller if provided
            if (middleware && middleware.length > 0) {
                middleware.forEach(function (mw) {
                    _this.router.use("".concat(parentRoute).concat(endpoint), mw);
                });
            }
            if (method && endpoint && handler) {
                switch (method.toLowerCase()) {
                    case 'get':
                        _this.router.get("".concat(parentRoute).concat(endpoint), handler);
                        break;
                    case 'post':
                        _this.router.post("".concat(parentRoute).concat(endpoint), handler);
                        break;
                    case 'put':
                        _this.router.put("".concat(parentRoute).concat(endpoint), handler);
                        break;
                    case 'delete':
                        _this.router.delete("".concat(parentRoute).concat(endpoint), handler);
                        break;
                    case 'all':
                        _this.router.all("".concat(parentRoute).concat(endpoint), handler);
                        break;
                    default:
                        console.error("Unsupported HTTP method: ".concat(method));
                }
            }
            else {
                console.error("Invalid controller: ".concat(controller));
            }
        });
    };
    return NodeashRoutes;
}());
exports.default = NodeashRoutes;
