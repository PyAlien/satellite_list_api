import { Request, Response, Router } from 'express';
import { validate } from '../../validate';
import { CreateSaDto } from './dto';
import { satelliteService } from './satellite.service';
import { Satellite } from './satellite.type';

export const satelliteController = Router();

satelliteController.post('', (req: Request, res: Response) => {
  const instanse = validate(CreateSaDto, req.body);
  const result = satelliteService.create(instanse);
  res.json(result);
});

satelliteController.get('', (req: Request, res: Response) => {
  const result = satelliteService.findAll();
  res.json(result);
});

satelliteController.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const result: Satellite | null = satelliteService.findById(id);
  res.json(result);
});

satelliteController.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedSatellite = satelliteService.update(id, req.body);
  res.json(updatedSatellite);
});

satelliteController.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  satelliteService.delete(id);
  res.json({ message: `Спутник с id '${id}' успешно удалён.` });
});
