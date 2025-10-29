import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { createUserRouter } from './UserRouter.js';

export function createAPIRouter(userController: UserController): Router {
  const router = Router();
  router.use('/users', createUserRouter(userController));

  return router;
}
