import { SatelliteRepository } from './satellite.repository';
import { SatelliteService } from './satellite.service';
import { SatelliteController } from './satellite.controller';

const repository = new SatelliteRepository();
const service = new SatelliteService(repository);
export const satelliteController = new SatelliteController(service);
