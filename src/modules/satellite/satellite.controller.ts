import { Request, Response, Router } from 'express';
import { satelliteService } from './satellite.service';

const satelliteController = Router();

satelliteController.get('/', (req: Request, res: Response) => {
  const result = satelliteService.findAll();

  res.json(result);
});

export default satelliteController;
