import { logger } from '../../logger/pino.logger';
import { satelliteRepository } from './satellite.repository';
import { Satellite } from './satellite.type';

export const satelliteService = {
  findAll() {
    logger.info('Чтение всех спутников');
    return satelliteRepository.findAll();
  },
  findById(id: string) {
    logger.info(`Чтение спутника по id: '${id}'`);
    return satelliteRepository.findById(id);
  },
  create(sat: Omit<Satellite, 'id'>): Satellite {
    logger.info(`Создание нового спутника "${sat.name}"`);
    return satelliteRepository.save(sat);
  },
  update(id: string, data: Partial<Omit<Satellite, 'id'>>) {
    logger.info(`Обновление спутника с id: '${id}'`);
    return satelliteRepository.update(id, data);
  },
  delete(id: string) {
    logger.info(`Удаление спутника с id: '${id}'`);
    return satelliteRepository.delete(id);
  },
};
