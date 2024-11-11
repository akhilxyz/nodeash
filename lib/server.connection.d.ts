/// <reference types="node" />
import http from 'http';
import { ControllerInterface } from './interface/controller.interface';
interface ServerClientOptions {
    controllers?: ControllerInterface[];
    port?: number;
    baseUrl?: string;
}
declare class ServerClient {
    private app;
    private app_Server;
    private port;
    private baseUrl;
    constructor(options?: ServerClientOptions);
    private initMiddleware;
    private initControllers;
    startCron(cronJobs: any): void;
    startServer: () => void;
    getHttpServer: () => http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    private onListening;
    private onError;
}
export default ServerClient;
