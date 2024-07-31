import { Router } from 'express';
const private_routes = Router();

import { verifyToken } from '../middlewares/auth.js';

import {
  listPessoa,
  indexPessoa,
  storePessoa,
  updatePessoa,
  removePessoa,
  removeCredencial,
} from '../controllers/pessoa/index.js';
import {
  listProduto,
  listProdutoByTipo,
  storeProduto,
  updateProduto,
  removeProduto,
} from '../controllers/produto/index.js';

private_routes
  .get('/pessoa', verifyToken, listPessoa)
  .get('/pessoa/:id', verifyToken, indexPessoa)
  .post('/pessoa', verifyToken, storePessoa)
  .put('/pessoa', verifyToken, updatePessoa)
  .delete('/pessoa', verifyToken, removePessoa)
  .delete('/pessoa', verifyToken, removeCredencial)

  .get('/produto', verifyToken, listProduto)
  .get('/produto/tipo', verifyToken, listProdutoByTipo)
  .post('/produto', verifyToken, storeProduto)
  .put('/produto', verifyToken, updateProduto)
  .delete('/produto', verifyToken, removeProduto);

export default private_routes;
