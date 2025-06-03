import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, Route } from '../../common';
import { validate } from '../../validate';
import { CreateSatDto, UpdateSatDto } from './dto';
import { SatelliteService } from './satellite.service';
import { Satellite } from './satellite.type';

@injectable()
export class SatelliteController extends BaseController {
  constructor(
    @inject(SatelliteService)
    private readonly service: SatelliteService,
  ) {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const routes: Route[] = [
      { path: '/', method: 'post', handler: this.createSat },
      { path: '/', handler: this.getAllSat },
      { path: '/:id', method: 'put', handler: this.updateSat },
      { path: '/:id', method: 'delete', handler: this.deleteSat },
      { path: '/:id', handler: this.getSat },
    ];

    this.addRoute(routes);
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
    const instance = validate(UpdateSatDto, req.body);
    const updatedSatellite = this.service.update(id, instance);
    res.json(updatedSatellite);
  }

  deleteSat(req: Request, res: Response) {
    const { id } = req.params;
    this.service.delete(id);
    res.json({ message: `Спутник с id '${id}' успешно удалён.` });
  }
}
