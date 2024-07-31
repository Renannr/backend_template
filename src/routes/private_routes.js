import { Router } from 'express';
const private_routes = Router();

import { verifyToken } from '../middlewares/auth.js';

import Pessoa from '../controllers/pessoa/index.js';
import Produto from '../controllers/produto/index.js';

private_routes
  .get('/pessoa', verifyToken, Pessoa.list)
  .get('/pessoa/:id', verifyToken, Pessoa.index)
  .post('/pessoa', verifyToken, Pessoa.store)
  .put('/pessoa', verifyToken, Pessoa.update)
  .delete('/pessoa', verifyToken, Pessoa.delete)
  .delete('/pessoa', verifyToken, Pessoa.deleteCredencial)

  .get('/produto', verifyToken, Produto.list)
  .get('/produto/tipo', verifyToken, Produto.listByTipo)
  .post('/produto', verifyToken, Produto.store)
  .put('/produto', verifyToken, Produto.update)
  .delete('/produto', verifyToken, Produto.delete);

export default private_routes;
