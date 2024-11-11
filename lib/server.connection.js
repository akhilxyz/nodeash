'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var debug_1 = __importDefault(require("debug"));
// import path from 'path';
var version_json_1 = __importDefault(require("./version.json"));
var debugInstance = (0, debug_1.default)('node');
var ServerClient = /** @class */ (function () {
    function ServerClient(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.initMiddleware = function () {
            _this.app.set('port', _this.port);
            _this.app.use((0, helmet_1.default)());
            _this.app.use((0, cors_1.default)());
            _this.app.use(body_parser_1.default.json());
            _this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: '5mb' }));
        };
        this.initControllers = function (controllers) {
            if (controllers.length > 0) {
                controllers.forEach(function (controller) {
                    _this.app.use("".concat(_this.baseUrl), controller.router);
                });
            }
            _this.app.use("".concat(_this.baseUrl, "/status"), function (_req, res) {
                return res.send({
                    isSuccess: true,
                    memory: process.memoryUsage(),
                    results: {
                        message: "App is running on Port ".concat(_this.port, "."),
                    },
                    Date: new Date(),
                });
            });
        };
        this.startServer = function () {
            _this.app_Server.on('error', _this.onError);
            _this.app_Server.on('listening', _this.onListening);
            _this.app_Server.listen(_this.port);
        };
        this.getHttpServer = function () {
            return _this.app_Server;
        };
        this.onListening = function () {
            var bind = "port ".concat(_this.port);
            debugInstance('Listening on ' + bind);
            // console.log(`ᴀᴘᴘ ɪꜱ ʟɪꜱᴛᴇɴɪɴɢ ᴏɴ ᴘᴏʀᴛ ${this.port}`);
            console.log("\uD83C\uDF3C Nodeash ".concat(version_json_1.default.version, " Server pack\n\n\u2570\u256E\n\n \u2570\u2500 \u2714\uFE0E [ 2 ] Nodeash are enabled. \n\n  \u2764\uFE0E \u1D00\u1D18\u1D18 \u026A\uA731 \u029F\u026A\uA731\u1D1B\u1D07\u0274\u026A\u0274\u0262 \u1D0F\u0274 \u1D18\u1D0F\u0280\u1D1B ").concat(_this.port, "\n\n "));
        };
        this.onError = function (error) {
            if (error instanceof Error) {
                throw error;
            }
            var errnoError = error;
            if (errnoError.syscall !== undefined) {
                var bind = "port ".concat(_this.port);
                switch (errnoError.code) {
                    case 'EACCES':
                        console.log(bind + ' requires elevated privileges');
                        break;
                    case 'EADDRINUSE':
                        console.log(bind + ' is already in use');
                        break;
                    default:
                        throw error;
                }
                process.exit(1);
            }
        };
        var _a = options.controllers, controllers = _a === void 0 ? [] : _a, _b = options.port, port = _b === void 0 ? 3000 : _b, _c = options.baseUrl, baseUrl = _c === void 0 ? "" : _c;
        this.app = (0, express_1.default)();
        this.app_Server = http_1.default.createServer(this.app);
        this.port = port;
        this.baseUrl = baseUrl;
        this.initMiddleware();
        this.initControllers(controllers);
        // this.startProcess();
    }
    ServerClient.prototype.startCron = function (cronJobs) {
        if (Array.isArray(cronJobs)) {
            cronJobs.forEach(function (cronJob) {
                if (typeof cronJob === 'function') {
                    cronJob();
                }
            });
        }
        else {
            console.error('Cron jobs should be an array of functions.');
        }
    };
    return ServerClient;
}());
exports.default = ServerClient;
