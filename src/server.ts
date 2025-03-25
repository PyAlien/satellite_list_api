import dotenv from 'dotenv';
import express from 'express';
import { logRoutes } from './bootstrap/log-routes';
import logger from './logger/pino.logger';
import satelliteController from './modules/satellite/satellite.controller';

dotenv.config();
const app = express();

app.use(express.json());

app.use('satellite', satelliteController);

logRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
