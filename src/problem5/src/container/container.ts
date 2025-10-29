import { ContainerOptions } from '../types/Container.js';
import { LowDatabase } from '../types/Database.js';
import { DBClient } from '../databases/client/DBClient.js';
import { UserDB } from '../databases/user/UserDB.js';
import { UserService } from '../services/user/UserService.js';
import { UserOrchestrator } from '../application/UserOrchestrator.js';

export class Container {
  private data: Map<string, unknown> = new Map();
  constructor(private options: ContainerOptions) {}
  async getDBClient(): Promise<LowDatabase> {
    const name = 'DBClient';
    if (this.data.has(name)) return this.data.get(name) as LowDatabase;
    const client = await DBClient(this.options.dataDir);
    this.data.set(name, client);
    return client;
  }
  async getUserDB(): Promise<UserDB> {
    const name = 'UserDB';
    if (this.data.has(name)) return this.data.get(name) as UserDB;
    const db = new UserDB(await this.getDBClient());
    this.data.set(name, db);
    return db;
  }
  async getUserService(): Promise<UserService> {
    const name = 'UserService';
    if (this.data.has(name)) return this.data.get(name) as UserService;
    const service = new UserService(await this.getUserDB());
    this.data.set(name, service);
    return service;
  }
  async getUserOrchestrator(): Promise<UserOrchestrator> {
    const name = 'UserOrchestrator';
    if (this.data.has(name)) return this.data.get(name) as UserOrchestrator;
    const orchestrator = new UserOrchestrator(await this.getUserService());
    this.data.set(name, orchestrator);
    return orchestrator;
  }
}
