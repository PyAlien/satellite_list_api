import { injectable } from 'inversify';
import { ConflictException, NotFoundException } from '../../exceptions';
import { logger } from '../../logger/pino.logger';
import { CreateSatDto } from './dto';
import { SatelliteRepository } from './satellite.repository';
import { Satellite } from './satellite.type';

@injectable()
export class SatelliteService {
  constructor(private readonly repository: SatelliteRepository) {}
  create(sat: CreateSatDto): Satellite {
    logger.info(`Создание нового спутника "${sat.name}"`);

    const exists: Satellite | null = this.repository.findByName(sat.name);
    if (exists) {
      throw new ConflictException(`Спутник ${sat.name} уже создан!`);
    }
    return this.repository.save(sat);
  }
  findAll() {
    logger.info('Чтение всех спутников');
    const satList = this.repository.findAll();
    if (!satList.length) {
      throw new Error(`Данные о спутниках не найдены`);
    }
    return satList;
  }
  findById(id: string) {
    logger.info(`Чтение спутника по id: '${id}'`);
    const satellite = this.repository.findById(id);
    if (!satellite) {
      throw new NotFoundException(`Спутник с id: '${id}' не найден!`);
    }
    return satellite;
  }
  update(id: string, data: Partial<Omit<Satellite, 'id'>>) {
    logger.info(`Обновление спутника с id: '${id}'`);
    const satellite = this.repository.update(id, data);
    if (!satellite) {
      throw new Error(`Спутник с id: '${id}' не найден!`);
    }
    return satellite;
  }
  delete(id: string) {
    logger.info(`Удаление спутника с id: '${id}'`);
    const satelliteState = this.repository.delete(id);
    if (!satelliteState) {
      throw new Error(`Спутник с id: '${id}' не найден!`);
    }
    return satelliteState;
  }
}
