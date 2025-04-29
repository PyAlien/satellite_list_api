import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { logRoutes } from './bootstrap/log-routes';
import { logger } from './logger/pino.logger';
import { ErrorHandler, LogRequest } from './middlewares';
import { satelliteController } from './modules/satellite/satellite.controller';
import { userController } from './modules/user/user.controller';

dotenv.config();
const app = express();

app.use(express.json());

app.use(LogRequest);

app.use('/satellite', satelliteController);

app.use('/user', userController);

app.use(ErrorHandler);

logRoutes(app);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
