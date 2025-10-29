import '../types/express.d.js';

import express from 'express';
import { Container } from '../container/container.js';
import { ResponseMiddleware } from '../middlewares/ResponseMiddleware.js';
import { ErrorHandlers } from '../middlewares/ErrorHandlers.js';
import { createAPIRouter } from '../routes/index.js';
import { ContainerOptions } from '../types/Container.js';
import { UserController } from '../controllers/UserController.js';

/**
 * IMPORTANT NOTE
 * because express router does not handle async/await function with global error
 * so to handle async function error, we should have to patch express routers
 * if not patched, nodejs process will crash if function throws error
 * because this is basic example (code only), so it has not been patched
 * Currently I am using try catch on each controller to catch errors instead, to avoid nodejs crash
 */
export class Client {
  constructor(
    private port: number,
    private options: ContainerOptions,
  ) {}
  async start() {
    const container = new Container(this.options);
    const userController = new UserController(await container.getUserOrchestrator());
    const app = express();
    app.use(ResponseMiddleware);
    app.use(express.json());
    app.use('/api', createAPIRouter(userController));
    app.use(ErrorHandlers);
    app.listen(this.port, () => {
      console.log('Backend server listening at: ' + this.port);
    });
  }
}
