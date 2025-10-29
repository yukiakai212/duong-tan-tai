import { Low } from 'lowdb';
import { User } from './User.js';

export interface Database {
  users: User[];
}
export type LowDatabase = Low<Database>;
