import 'reflect-metadata';
import express from 'express';
import { Container } from 'inversify';
import { logRoutes } from './bootstrap/log-routes';
import { appConfig } from './config';
import { logger } from './logger/pino.logger';
import { ErrorHandler, LogRequest } from './middlewares';
import { satelliteController, satelliteModule } from './modules/satellite/satellite.module';
import { userController, userModule } from './modules/user/user.module';

const bootstrap = () => {
  const appContainer = Container.merge(userModule, satelliteModule);

  const app = express();

  app.use(express.json());
  app.use(LogRequest);

  app.use('/satellite', satelliteController.router);
  app.use('/user', userController.router);
  app.use(ErrorHandler);

  logRoutes(app);

  app.listen(appConfig.port, () => {
    logger.info(`Server running on http://localhost:${appConfig.port}`);
  });
};

bootstrap();
