import { Container } from 'inversify';
import { SatelliteController } from './satellite.controller';
import { SatelliteRepository } from './satellite.repository';
import { SatelliteService } from './satellite.service';

export const satelliteModule = new Container();

satelliteModule.bind(SatelliteRepository).toSelf().inSingletonScope();
satelliteModule.bind(SatelliteService).toSelf().inSingletonScope();
satelliteModule.bind(SatelliteController).toSelf().inSingletonScope();

export const satelliteController = satelliteModule.get(SatelliteController);
