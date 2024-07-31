import { Router } from 'express';
const routes = Router();

import request_error from '../middlewares/request_error.js';

import privateRoutes from './private_routes.js';
import publicRoutes from './public_routes.js';

routes
  .use(publicRoutes)
  .use(privateRoutes)
  .use(request_error)
  .use((req, res, next) => {
    console.log('Falling back to catch all route');
    res.status(404).json({
      message: 'Página não encontrada',
      path: req.path,
    });
  });

export default routes;
