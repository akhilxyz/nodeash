"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeashRoutes = exports.ServerClient = void 0;
var server_connection_1 = __importDefault(require("./server.connection"));
exports.ServerClient = server_connection_1.default;
var router_1 = __importDefault(require("./router"));
exports.NodeashRoutes = router_1.default;
