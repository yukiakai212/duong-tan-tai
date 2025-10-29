import { UserService } from '../services/user/UserService.js';
import { User } from '../types/User.js';

export class UserOrchestrator {
  constructor(private service: UserService) {}
  getById(id: string): User {
    return this.service.getById(id);
  }
  listUsers(offset: number, size: number): User[] {
    return this.service.listUsers(offset, size);
  }
  async createUser(user: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    return await this.service.createUser(user);
  }
  async updateById(id: string, user: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    return await this.service.updateById(id, user);
  }
  async deleteById(id: string): Promise<void> {
    return await this.service.deleteById(id);
  }
}
