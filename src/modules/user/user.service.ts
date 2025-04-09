import { compareSync, hashSync } from 'bcrypt';
import { logger } from '../../logger/pino.logger';
import { userRepository } from './user.repository';
import { User } from './user.type';

export const userService = {
  register(data: Omit<User, 'id'>): User {
    logger.info(`Регистрация пользователя "${data.email}"`);

    const exists: User | null = userRepository.findByEmail(data.email);
    if (exists) {
      throw new Error('Пользователь с таким email уже существует');
    }

    data.password = hashSync(data.password, 4);

    return userRepository.save(data);
  },

  login(dto: Pick<User, 'email' | 'password'>): User {
    const { email, password } = dto;
    logger.info(`Логин для пользователя "${email}"`);

    const user = userRepository.findByEmail(email);
    if (!user || !compareSync(password, user.password)) {
      throw new Error('Неверная почта или пароль');
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
