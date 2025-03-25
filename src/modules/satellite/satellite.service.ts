import logger from '../../logger/pino.logger';
import { satelliteRepository } from './satellite.repository';
import { Satellite } from './satellite.types';

export const satelliteService = {
  findAll() {
    logger.info(`Чтение всех спутников`);

    const satellites = satelliteRepository.findAll();

    return satellites;
  },

  findById(id: string) {
    logger.info(`Чтение спутника по id=${id}`);

    const satellite = satelliteRepository.findById(id);

    if (!satellite) {
      throw Error(`Спутник ${id} не найден`);
    }

    return satellite;
  },

  create(sat: Omit<Satellite, 'id'>) {
    logger.info(`Создание нового спутника "${sat.title}"`);

    const satellite = satelliteRepository.save(sat);

    return satellite;
  },
};
