import { Request, Response, Router } from 'express';
import { satelliteService } from './satellite.service';

const satelliteController = Router();

satelliteController.get('', (req: Request, res: Response) => {
  const result = satelliteService.findAll();

  res.json(result);
});

satelliteController.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const result = satelliteService.findById(id);

  res.json(result);
});

satelliteController.post('', (req: Request, res: Response) => {
  const body = req.body;

  const result = satelliteService.create(body);

  res.json(result);
});

export default satelliteController;
