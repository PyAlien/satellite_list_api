import { ConflictException } from '../../exceptions';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { logger } from '../../logger/pino.logger';
import { satelliteRepository } from './satellite.repository';
import { Satellite } from './satellite.type';

export const satelliteService = {
  create(sat: Omit<Satellite, 'id'>): Satellite {
    logger.info(`Создание нового спутника "${sat.name}"`);

    const exists: Satellite | null = satelliteRepository.findByName(sat.name);
    if (exists) {
      throw new ConflictException(`Спутник ${sat.name} уже создан!`);
    }
    return satelliteRepository.save(sat);
  },
  findAll() {
    logger.info('Чтение всех спутников');
    const satList = satelliteRepository.findAll();
    if (!satList.length) {
      throw new Error(`Данные о спутниках не найдены`);
    }
    return satList;
  },
  findById(id: string) {
    logger.info(`Чтение спутника по id: '${id}'`);
    const satellite = satelliteRepository.findById(id);
    if (!satellite) {
      throw new NotFoundException(`Спутник с id: '${id}' не найден!`);
    }
    return satellite;
  },
  update(id: string, data: Partial<Omit<Satellite, 'id'>>) {
    logger.info(`Обновление спутника с id: '${id}'`);
    const satellite = satelliteRepository.update(id, data);
    if (!satellite) {
      throw new Error(`Спутник с id: '${id}' не найден!`);
    }
    return satellite;
  },
  delete(id: string) {
    logger.info(`Удаление спутника с id: '${id}'`);
    const satelliteState = satelliteRepository.delete(id);
    if (!satelliteState) {
      throw new Error(`Спутник с id: '${id}' не найден!`);
    }
    return satelliteRepository.delete(id);
  },
};
