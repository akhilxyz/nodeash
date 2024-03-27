import { Router, Request, Response, NextFunction } from 'express';

interface Controller {
    method: string;
    endpoint: string;
    handler: (req: Request, res: Response, next: NextFunction) => void;
}

class NodeashRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
    }

    initializeRoutes(path: string, controllers: Controller[], ...middleware: ((req: Request, res: Response, next: NextFunction) => void)[]) {
        if (middleware.length > 0) {
            middleware.forEach(mw => {
                this.router.use(path, mw);
            });
        }

        controllers.forEach(controller => {
            const { method, endpoint, handler } = controller;
            if (method && endpoint && handler) {
                switch (method.toLowerCase()) {
                    case 'get':
                        this.router.get(`${path}${endpoint}`, handler);
                        break;
                    case 'post':
                        this.router.post(`${path}${endpoint}`, handler);
                        break;
                    case 'put':
                        this.router.put(`${path}${endpoint}`, handler);
                        break;
                    case 'delete':
                        this.router.delete(`${path}${endpoint}`, handler);
                        break;
                    case 'all':
                        this.router.all(`${path}${endpoint}`, handler);
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

export default NodeashRoutes

// // Example usage:
// const userControllers: Controller[] = [
//     {
//         method: 'get',
//         endpoint: '/register',
//         handler: (req, res) => {
//             res.send('Register API called');
//         }
//     },
//     // Add more controllers as needed
// ];

// const userMiddleware1: ((req: Request, res: Response, next: NextFunction) => void) = (req, res, next) => {
//     // Your middleware logic here
//     next();
// };

// const userMiddleware2: ((req: Request, res: Response, next: NextFunction) => void) = (req, res, next) => {
//     // Your other middleware logic here
//     next();
// };

// const userRoutes = new DynamicRoutes();
// userRoutes.initializeRoutes('/user', userControllers, userMiddleware1, userMiddleware2);

// export default userRoutes.router;
