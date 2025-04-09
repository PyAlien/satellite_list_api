import { nanoid } from 'nanoid';
import { User } from './user.type';

const users: User[] = [];

export const userRepository = {
  save(user: Omit<User, 'id'>): User {
    const newUser: User = { ...user, id: nanoid(6) };

    users.push(newUser);

    return newUser;
  },

  findByEmail(email: string): User | null {
    return users.find((user) => user.email === email) || null;
  },

  findById(id: string): User | null {
    return users.find((user) => user.id === id) || null;
  },

  update(id: string, data: Partial<Omit<User, 'id'>>): User | null {
    const user = this.findById(id);
    if (!user) {
      return null;
    }

    Object.assign(user, data);
    return user;
  },
};
