import { LowDatabase } from '../../types/Database.js';
import { User } from '../../types/User.js';
/**
 * Simple User DB
 */
export class UserDB {
  constructor(private db: LowDatabase) {}
  getById(id: string): User {
    const user = this.db.data.users.find((user) => user.id === id);
    if (!user) throw new Error('User not found');

    // Simple deep clone
    // Should not use ref objects, it can cause bugs that are difficult to detect later
    return JSON.parse(JSON.stringify(user));
  }
  /**
   * Basic pagination with offset and size
   * Assume the input has already been validated
   * @param offset - number
   * @param size  - number
   * @returns User[]
   */
  listUsers(offset: number, size: number): User[] {
    const users = this.db.data.users.slice(offset, offset + size);
    return users;
  }
  async createUser(user: User): Promise<User> {
    this.db.data.users.push(user);
    await this.db.write();
    return user;
  }
  async updateById(id: string, user: User): Promise<User> {
    const userIndex = this.db.data.users.findIndex((x) => x.id === id);
    if (userIndex < 0) throw new Error('User not found');
    this.db.data.users[userIndex] = user;
    await this.db.write();
    return user;
  }
  async deleteById(id: string): Promise<void> {
    this.db.data.users = this.db.data.users.filter((user) => user.id !== id);
    await this.db.write();
  }
}
