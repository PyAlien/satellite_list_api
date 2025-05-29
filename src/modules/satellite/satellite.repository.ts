import { nanoid } from 'nanoid';
import { Satellite } from './satellite.type';

const storage: Satellite[] = [];

export class SatelliteRepository {
  findAll() {
    return storage;
  }

  save(sat: Omit<Satellite, 'id'>) {
    const satellite: Satellite = { ...sat, id: nanoid(4) };
    storage.push(satellite);
    return satellite;
  }

  findById(id: string) {
    return storage.find((sat) => sat.id === id) || null;
  }

  findByName(satName: string) {
    return storage.find((sat) => sat.name === satName) || null;
  }

  update(id: string, data: Partial<Omit<Satellite, 'id'>>) {
    const satellite = this.findById(id);
    if (!satellite) return null;
    Object.assign(satellite, data);
    return satellite;
  }

  delete(id: string): boolean {
    const index = storage.findIndex((sat) => sat.id === id);
    if (index === -1) return false;
    storage.splice(index, 1);
    return true;
  }
}
