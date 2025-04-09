import { logger } from '../../logger/pino.logger';
import { userRepository } from './user.repository';
import { User } from './user.type';

export const userService = {
  register(data: Omit<User, 'id'>): User {
    logger.info(`Регистрация пользователя "${data.username}"`);

    const exists: User | null = userRepository.findByUsername(data.username);
    if (exists) {
      throw new Error('Пользователь с таким именем уже существует');
    }

    return userRepository.save(data);
  },

  login(username: string, password: string): User {
    logger.info(`Логин пользователя "${username}"`);

    const user = userRepository.findByUsername(username);
    if (!user || user.password !== password) {
      throw new Error('Неверный логин или пароль');
    }

    return user;
  },

  getProfile(id: string): User {
    const user = userRepository.findById(id);

    if (!user) {
      throw new Error(`Пользователь с id '${id}' не найден`);
    }

    return user;
  },

  updateProfile(id: string, data: Partial<Omit<User, 'id'>>): User {
    logger.info(`Обновление профиля пользователя ${id}`);

    const updated = userRepository.update(id, data);
    if (!updated) {
      throw new Error(`Пользователь с id '${id}' не найден`);
    }

    return updated;
  },
};
