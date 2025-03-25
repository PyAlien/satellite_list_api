import { NextFunction, Request, Response } from 'express';
import logger from '../logger/pino.logger';

export const LogRequest = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl, query, body } = req;

  logger.info(`Пришел ${method} ${originalUrl}`);

  next();
};
