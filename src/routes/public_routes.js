import { Router } from 'express';
const public_routes = Router();

import { verifyToken } from '../middlewares/auth.js';

import { hello } from '../controllers/public/index.js';

public_routes.get('/', hello);

export default public_routes;
