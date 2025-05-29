import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BadRequestException } from '../exceptions';

export const validate = <T extends object, V>(cls: new () => T, plain: V): T => {
  const instance = plainToInstance(cls, plain);
  const errors = validateSync(instance);
  if (errors.length) {
    const constraints = errors[0].constraints;
    let message = 'Unknown validation error';

    if (constraints) {
      message = constraints[Object.keys(constraints)[0]];
    }

    throw new BadRequestException(message);
  }
  return instance;
};
