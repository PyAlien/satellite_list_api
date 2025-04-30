import { ConflictException, UnauthorisedException } from '../../exceptions';
import { logger } from '../../logger/pino.logger';
import { UserRepository } from './user.repository';
import { User } from './user.type';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  reg(data: Omit<User, 'id'>): User {
    logger.info(`Регистрация пользователя "${data.name}". Логин: "${data.email}"`);

    const exists: User | null = this.repository.findByEmail(data.email);
    if (exists) {
      throw new ConflictException(`Пользователь с email: ${data.email} уже зарегистрирован!`);
    }

    return this.repository.save(data);
  }

  login(data: Pick<User, 'email' | 'password'>): User {
    logger.info(`Логин пользователя "${data.email}"`);

    const user = this.repository.findByEmail(data.email);
    if (!user || user.password !== data.password) {
      throw new UnauthorisedException('Неверный логин или пароль');
    }

    return user;
  }

  getProfile(id: string): User {
    const user = this.repository.findById(id);
    if (!user) {
      throw new Error(`Пользователь с id '${id}' не найден`);
    }
    return user;
  }

  updateProfile(id: string, data: Partial<Omit<User, 'id'>>): User {
    logger.info(`Обновление профиля пользователя ${id}`);
    const updated = this.repository.update(id, data);
    if (!updated) throw new Error(`Пользователь с id '${id}' не найден`);
    return updated;
  }
}
