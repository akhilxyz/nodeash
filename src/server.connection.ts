'use strict';
import http from 'http';
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import debug from 'debug';
import { ControllerInterface } from './interface/controller.interface';
// import path from 'path';
import versionInfo from './version.json';

const debugInstance = debug('node');


interface ServerClientOptions {
    controllers?: ControllerInterface[];
    port?: number;
    baseUrl?: string;
}


class ServerClient {
    private app: Application;
    private app_Server: http.Server;
    private port: number;
    private baseUrl : string;

  
    constructor(options: ServerClientOptions = {}) {
        const { controllers = [], port = 3000, baseUrl = "" } = options;
        this.app = express();
        this.app_Server = http.createServer(this.app);
        this.port = port;
        this.baseUrl = baseUrl;
        this.initMiddleware();
        this.initControllers(controllers);
        // this.startProcess();
    }

    private initMiddleware = () => {
        this.app.set('port', this.port);
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
    }

    private initControllers = (controllers: ControllerInterface[]) => {
        if (controllers.length > 0) {
            controllers.forEach((controller: ControllerInterface) => {
                this.app.use(`${this.baseUrl}`, controller.router);
            });
        }


        this.app.use( `${this.baseUrl}/status`, (_req: Request, res: Response) => {
            return res.send({
                isSuccess: true,
                memory: process.memoryUsage(),
                results: {
                    message: `App is running on Port ${this.port}.`,
                },
                Date: new Date(),
            })
        });
    }

    public startCron(cronJobs :any ) {
        if (Array.isArray(cronJobs)) {
            cronJobs.forEach((cronJob :any) => {
                if (typeof cronJob === 'function') {
                    cronJob();
                }
            });
        } else {
            console.error('Cron jobs should be an array of functions.');
        }
    }

    public startServer = () => {
        this.app_Server.on('error', this.onError);
        this.app_Server.on('listening', this.onListening);
        this.app_Server.listen(this.port);
    }


    public getHttpServer = () => {
        return this.app_Server
    }


    private onListening = () => {
        const bind = `port ${this.port}`;
        debugInstance('Listening on ' + bind);
        // console.log(`ᴀᴘᴘ ɪꜱ ʟɪꜱᴛᴇɴɪɴɢ ᴏɴ ᴘᴏʀᴛ ${this.port}`);
        console.log(`🌼 Nodeash ${versionInfo.version} Server pack\n\n╰╮\n\n ╰─ ✔︎ [ 2 ] Nodeash are enabled. \n\n  ❤︎ ᴀᴘᴘ ɪꜱ ʟɪꜱᴛᴇɴɪɴɢ ᴏɴ ᴘᴏʀᴛ ${this.port}\n\n `);

    }


    private onError = (error: Error | NodeJS.ErrnoException) => {
        if (error instanceof Error) {
            throw error;
        }

        const errnoError = error as NodeJS.ErrnoException;
        if (errnoError.syscall !== undefined) {
            const bind = `port ${this.port}`;
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
    }
}

export default ServerClient;
