import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Sequelize, { DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let sequelize;
let env = process.env;

if (env.DATABASE_URL) {
  sequelize = new Sequelize(env.DATABASE_URL);
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: env.STORAGE,
  });
}

const db = {};

const loadModels = async () => {
  const files = readdirSync(__dirname).filter(
    (file) => file.endsWith('.js') && file !== 'index.js' && file !== 'main.js'
  );

  for (const file of files) {
    console.log('Load Module > ' + file + '\n');
    const { default: model } = await import(join(__dirname, file));
    const initializedModel = model(sequelize, DataTypes);
    db[initializedModel.name] = initializedModel;
  }

  console.log('\nInicialização dos módulos finalizada!\n');

  Object.values(db).forEach((model) => {
    if (model.associate) {
      model.associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

await loadModels();

export default db;
