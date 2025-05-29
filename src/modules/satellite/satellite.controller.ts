import { Request, Response } from 'express';
import { BaseController, Route } from '../../common';
import { validate } from '../../validate';
import { CreateSatDto, UpdateSaDto } from './dto';
import { SatelliteService } from './satellite.service';
import { Satellite } from './satellite.type';

// export const satelliteController = Router();
export class SatelliteController extends BaseController {
  constructor(private readonly service: SatelliteService) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      { path: '/satellite', method: 'post', handler: this.createSat },
      { path: '/satellite', handler: this.getAllSat },
      { path: '/satellite/:id', method: 'put', handler: this.updateSat },
      { path: '/satellite/:id', method: 'delete', handler: this.deleteSat },
      { path: '/satellite/:id', method: 'get', handler: this.getSat },
    ];
  }

  createSat(req: Request, res: Response) {
    const instance = validate(CreateSatDto, req.body);
    const newSat = this.service.create(instance);
    res.json(newSat);
  }

  getAllSat(req: Request, res: Response) {
    const result = this.service.findAll();
    res.json(result);
  }

  getSat(req: Request, res: Response) {
    const id = req.params.id;
    const result: Satellite | null = this.service.findById(id);
    res.json(result);
  }

  updateSat(req: Request, res: Response) {
    const { id } = req.params;
    const instance = validate(UpdateSaDto, req.body);
    const updatedSatellite = this.service.update(id, instance);
    res.json(updatedSatellite);
  }

  deleteSat(req: Request, res: Response) {
    const { id } = req.params;
    this.service.delete(id);
    res.json({ message: `Спутник с id '${id}' успешно удалён.` });
  }
}
