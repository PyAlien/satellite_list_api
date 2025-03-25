import { nanoid } from 'nanoid';
import { Satellite } from './satellite.types';

const storage: Satellite[] = [];

export const satelliteRepository = {
  save(sat: Omit<Satellite, 'id'>) {
    const satellite: Satellite = { ...sat, id: nanoid(4) };

    storage.push(satellite);

    return satellite;
  },

  findAll() {
    return storage;
  },

  findById(id: string) {
    return storage.find((sat) => sat.id === id) ?? null;
  },
};
