import { Request, Response } from 'express';
import { UserOrchestrator } from '../application/UserOrchestrator.js';
import { createOrUpdateUserSchema, listUserQuerySchema } from '../schemas/UserSchemas.js';

export class UserController {
  constructor(private orchestrator: UserOrchestrator) {}
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res.success(await this.orchestrator.getById(id));
    } catch (error: any) {
      res.fail(error.message);
    }
  }
  async listUsers(req: Request, res: Response) {
    try {
      const { offset, size } = listUserQuerySchema.parse(req.query);
      res.success(await this.orchestrator.listUsers(offset, size));
    } catch (error: any) {
      res.fail(error.message);
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const user = createOrUpdateUserSchema.parse(req.body);
      res.success(await this.orchestrator.createUser(user));
    } catch (error: any) {
      res.fail(error.message);
    }
  }
  async updateById(req: Request, res: Response) {
    try {
      const user = createOrUpdateUserSchema.parse(req.body);
      const { id } = req.params;
      res.success(await this.orchestrator.updateById(id, user));
    } catch (error: any) {
      res.fail(error.message);
    }
  }
  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res.success(await this.orchestrator.deleteById(id));
    } catch (error: any) {
      res.fail(error.message);
    }
  }
}
