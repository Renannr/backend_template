import db from '../../models/index.js';
import { hash } from 'bcrypt';

const saltRounds = 10;

export const listPessoa = async (req, res) => {
  try {
    const pessoas = await db.Pessoa.findAll({
      include: [
        {
          model: db.Endereco,
          attributes: ['logradouro', 'complemento', 'cidade', 'estado', 'pais', 'codigo_postal'],
        },
        {
          model: db.Credencial,
          attributes: ['email', 'is_admin'],
        },
      ],
    });
    return res.json(pessoas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Erro ao buscar pessoas', erro: err });
  }
};
export const indexPessoa = async (req, res) => {
  const { id } = req.params;
  try {
    const pessoas = await db.Pessoa.findByPk(id, {
      include: [
        {
          model: db.Credencial,
          attributes: ['email', 'is_admin'],
        },
      ],
    });
    return res.json(pessoas || []);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Erro ao buscar pessoas', erro: err });
  }
};
export const storePessoa = async (req, res) => {
  const {
    nome,
    cpf,
    sobrenome,
    telefone,
    email,
    password,
    logradouro,
    complemento,
    cidade,
    estado,
    pais,
    codigo_postal,
    is_admin,
    cargo,
  } = req.body;

  const pessoaExists = await db.Pessoa.findOne({ where: { cpf } });

  if (pessoaExists) {
    return res.status(409).json({ msg: 'Pessoa já existe' });
  }

  const encrypted = await hash(password, saltRounds);

  try {
    const result = await db.sequelize.transaction(async (t) => {
      const new_pessoa = await db.Pessoa.create(
        { nome, sobrenome, cpf, telefone, cargo },
        { transaction: t }
      );
      let pessoa_id = new_pessoa.id;

      const new_credencial = await db.Credencial.create(
        {
          email,
          password: encrypted,
          is_admin,
          pessoa_id,
        },
        { transaction: t }
      );
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
      return {
        ...new_pessoa.dataValues,
        ...new_endereco.dataValues,
        ...new_credencial.dataValues,
      };
    });
    return res.status(201).json({ msg: 'Pessoa criada com sucesso', data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Erro ao criar pessoa', erro: err });
  }
};
export const updatePessoa = async (req, res) => {
  const {
    pessoa_id,
    nome,
    cpf,
    sobrenome,
    telefone,
    email,
    password,
    logradouro,
    complemento,
    cidade,
    estado,
    pais,
    codigo_postal,
    is_admin,
    cargo,
  } = req.body;

  const pessoa = await db.Pessoa.findByPk(pessoa_id);
  if (!pessoa) {
    return res.status(404).json({ msg: 'Pessoa não encontrada' });
  }
  pessoa.nome = nome || pessoa.nome;
  pessoa.cpf = cpf || pessoa.cpf;
  pessoa.sobrenome = sobrenome || pessoa.sobrenome;
  pessoa.telefone = telefone || pessoa.telefone;
  pessoa.cargo = cargo || pessoa.cargo;

  try {
    const updated_data = await db.sequelize.transaction(async (t) => {
      const endereco = await db.Endereco.findOne({ where: { pessoa_id } });
      const credencial = await db.Credencial.findOne({
        where: { pessoa_id },
      });

      endereco.logradouro = logradouro || endereco.logradouro;
      endereco.complemento = complemento || endereco.complemento;
      endereco.cidade = cidade || endereco.cidade;
      endereco.estado = estado || endereco.estado;
      endereco.pais = pais || endereco.pais;
      endereco.codigo_postal = codigo_postal || endereco.codigo_postal;

      if (!credencial) {
        var encrypted = await hash(password, saltRounds);
        var new_credencial = await db.Credencial.create({
          email,
          password: encrypted,
          is_admin,
          cargo,
          pessoa_id,
        });
      } else {
        credencial.email = email || credencial.email;
        credencial.is_admin = is_admin || credencial.is_admin;

        if (password) {
          credencial.password = await hash(password, saltRounds);
        }
        await credencial.save({ transaction: t });
      }

      await pessoa.save({ transaction: t });
      await endereco.save({ transaction: t });

      let result = {
        pessoa: pessoa.dataValues,
        endereco: endereco.dataValues,
      };

      return result;
    });
    return res.status(200).json({
      msg: `Pessoa id: ${pessoa_id} atualizada com sucesso`,
      updated_data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Erro ao atualizar pessoa', erro: err });
  }
};
export const removePessoa = async (req, res) => {
  const { cpf } = req.body;

  let pessoa = await db.Pessoa.findOne({ where: { cpf } });
  if (!pessoa) {
    return res.status(404).json({ msg: 'Pessoa não encontrada' });
  }

  try {
    const result = await db.sequelize.transaction(async (t) => {
      const e = await db.Endereco.destroy(
        {
          where: { pessoa_id: pessoa.id },
        },
        { transaction: t }
      );
      const c = await db.Credencial.destroy({
        where: { pessoa_id: pessoa.id },
      });
      const p = await db.Pessoa.destroy({ where: { id: pessoa.id } });
    });

    return res.status(200).json({ msg: `Usuário ${pessoa.nome} deletado com sucesso` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Erro ao deletar pessoa', erro: err });
  }
};
export const removeCredencial = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  const { email } = req.body;

  try {
    const result = await db.Credencial.destroy({ where: { email } }, transaction);
    if (result === 0) {
      return res.status(404).json({ msg: 'Pessoa não encontrada' });
    }

    return res.status(200).json({ msg: `Credenciais para ${email} deletada com sucesso` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Erro ao deletar pessoa', erro: err });
  }
};
