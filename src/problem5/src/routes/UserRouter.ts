import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

export function createUserRouter(userController: UserController): Router {
  const router = Router();
  router.get('/', userController.listUsers.bind(userController));
  router.get('/:id', userController.getById.bind(userController));
  router.delete('/:id', userController.deleteById.bind(userController));
  router.post('/', userController.createUser.bind(userController));
  router.put('/:id', userController.updateById.bind(userController));
  return router;
}
