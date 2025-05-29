import { NextFunction, Request, Response } from 'express';

export type Route = {
  path: string;
  method?: 'post' | 'get' | 'put' | 'delete';
  handler: (req: Request, res: Response) => void;
  middlewares?: ((req: Request, res: Response, next: NextFunction) => void)[];
};
