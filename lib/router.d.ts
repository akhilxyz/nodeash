import { Router, Request, Response, NextFunction } from 'express';
interface Controller {
    method: string;
    endpoint: string;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    middleware?: ((req: Request, res: Response, next: NextFunction) => void)[];
}
declare class NodeashRoutes {
    router: Router;
    constructor();
    initializeRoutes(parentRoute: string, controllers: Controller[]): void;
}
export default NodeashRoutes;
