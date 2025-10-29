import { UserDB } from '../../databases/user/UserDB.js';
import { User } from '../../types/User.js';

export class UserService {
  constructor(private db: UserDB) {}
  getById(id: string): User {
    return this.db.getById(id);
  }
  listUsers(offset: number, size: number): User[] {
    return this.db.listUsers(offset, size);
  }
  async createUser(newUser: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    const user: User = {
      name: newUser.name,
      email: newUser.email,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    return await this.db.createUser(user);
  }
  async updateById(
    id: string,
    userUpdated: Partial<Omit<User, 'id' | 'createdAt'>>,
  ): Promise<User> {
    const oldUser = this.getById(id);
    // Simple merge data
    const newUser = { ...oldUser, ...userUpdated };
    return await this.db.updateById(id, newUser);
  }
  async deleteById(id: string): Promise<void> {
    return await this.db.deleteById(id);
  }
}
