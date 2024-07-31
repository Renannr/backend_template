import db from '../models/index.js';
import { hash } from 'bcrypt';

const saltRounds = 10;

async function createInitialUser(req, res) {
  const usersCount = await db.Pessoa.count();

  if (usersCount > 0) {
    return res.status(403).json({ message: 'Forbidden. Initial user already exists.' });
  }

  const {
    nome,
    cpf,
    sobrenome,
    telefone,
    password,
    email,
    logradouro,
    complemento,
    cidade,
    estado,
    pais,
    codigo_postal,
    is_admin,
    cargo,
  } = req.body;

  try {
    const encrypted = await hash(password, saltRounds);
    const result = await db.sequelize.transaction(async (t) => {
      const new_pessoa = await db.Pessoa.create(
        { nome, sobrenome, cpf, telefone, cargo },
        { transaction: t }
      );

      let pessoa_id = new_pessoa.id;
      const new_endereco = await db.Endereco.create(
        {
          logradouro,
          complemento,
          cidade,
          estado,
          pais,
          codigo_postal,
          pessoa_id,
        },
        { transaction: t }
      );

      const new_credencial = await db.Credencial.create(
        { email, password: encrypted, is_admin, pessoa_id },
        { transaction: t }
      );
      return {
        ...new_pessoa.dataValues,
        ...new_endereco.dataValues,
        ...new_credencial.dataValues,
      };
    });
    return res.status(201).json({ message: 'Initial user created successfully.', data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating initial user.', erro: err });
  }
}

export default createInitialUser;
