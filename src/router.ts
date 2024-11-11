import { Router, Request, Response, NextFunction } from 'express';

interface Controller {
    method: string;
    endpoint: string;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    middleware?: ((req: Request, res: Response, next: NextFunction) => void)[];
}

class NodeashRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
    }

    initializeRoutes(parentRoute: string, controllers: Controller[]) {
        controllers.forEach(controller => {
            const { method, endpoint, handler, middleware } = controller;
            
            // Apply middleware for this controller if provided
            if (middleware && middleware.length > 0) {
                middleware.forEach(mw => {
                    this.router.use(`${parentRoute}${endpoint}`, mw);
                });
            }

            if (method && endpoint && handler) {
                switch (method.toLowerCase()) {
                    case 'get':
                        this.router.get(`${parentRoute}${endpoint}`, handler);
                        break;
                    case 'post':
                        this.router.post(`${parentRoute}${endpoint}`, handler);
                        break;
                    case 'put':
                        this.router.put(`${parentRoute}${endpoint}`, handler);
                        break;
                    case 'delete':
                        this.router.delete(`${parentRoute}${endpoint}`, handler);
                        break;
                    case 'all':
                        this.router.all(`${parentRoute}${endpoint}`, handler);
                        break;
                    default:
                        console.error(`Unsupported HTTP method: ${method}`);
                }
            } else {
                console.error(`Invalid controller: ${controller}`);
            }
        });
    }
}

export default NodeashRoutes;