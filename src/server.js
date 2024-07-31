import express from 'express';
import bodyParser from 'body-parser';
import { expressjwt as jwt } from 'express-jwt';
import cors from 'cors';
import process from 'node:process';
import dotenv from 'dotenv';
dotenv.config();

import db from './models/index.js';
import routes from './routes/index.js';

import { invalidToken } from './middlewares/auth.js';
import { validateToken, login } from './authenticate.js';

import createInitialUser from './controllers/createInitialUser.js';

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const jwtSecret = process.env.JWT_SECRET;
app.use(
  jwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
    path: ['/', '/login', '/check-token', '/create-initial-user'],
  })
);

app.post('/create-initial-user', createInitialUser);
app.post('/check-token', validateToken);
app.post('/login', login);

app.use(invalidToken);
app.use(routes);

const eraseDatabaseOnSync = false;

db.sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(() => {
    app.listen(process.env.PORT || 3333, () => {
      console.log(`\n\n\t>Server running... port: ${process.env.PORT || 3333}`);
      console.log('\t>Erase dataBase on Sync: ', eraseDatabaseOnSync);
      console.log();
    });
  })
  .catch((err) => console.log(err));

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
