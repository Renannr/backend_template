import { Router } from 'express';
const public_routes = Router();

import PublicController from '../controllers/public/index.js';

public_routes.get('/hello', PublicController.hello);
public_routes.get('/bye', PublicController.bye);

export default public_routes;
