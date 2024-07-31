import db from '../../models/index.js';

export default {
  async list(req, res) {
    try {
      console.log('alo');
      const produto = await db.Produto.findAll();
      return res.status(200).json(produto);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Erro ao listar produtos', erro: err });
    }
  },
  async index(req, res) {
    const { id } = req.params;
    try {
      const produto = await db.Produto.findByPk(id);
      return res.status(200).json(produto);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Erro ao listar produtos', erro: err });
    }
  },
  async listByTipo(req, res) {
    const { tipo } = req.body;

    try {
      const produto = await db.Produto.findAll({
        where: { tipo },
      });
      if (produto.length === 0) {
        return res.status(404).json({ msg: `Nenhum produto do tipo ${tipo} encontrado` });
      }
      return res.status(200).json(produto);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Erro ao listar produto por tipo', erro: err });
    }
  },
  async store(req, res) {
    const { codigo, nome, unidade, tipo } = req.body;

    try {
      const result = await db.sequelize.transaction(async (t) => {
        const produto = await db.Produto.create(
          { codigo, nome, unidade, tipo },
          { transaction: t }
        );
        return produto;
      });
      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Erro ao criar produto', erro: err });
    }
  },
  async update(req, res) {
    const { nome, codigo, unidade, tipo, produto_id } = req.body;

    const produto = await db.Produto.findByPk(produto_id);
    if (!produto) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    try {
      produto.nome = nome || produto.nome;
      produto.codigo = codigo || produto.codigo;
      produto.unidade = unidade || produto.unidade;
      produto.tipo = tipo || produto.tipo;

      const updated_data = await db.sequelize.transaction(async (t) => {
        await produto.save({ transaction: t });
        let result = { ...produto.dataValues };
        return result;
      });

      return res.status(200).json(updated_data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Erro ao atualizar produto', erro: err });
    }
  },
  async delete(req, res) {
    const { produto_id } = req.body;

    const produto = await db.Produto.findByPk(produto_id);
    if (!produto) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    try {
      const result = await db.sequelize.transaction(async (t) => {
        await produto.destroy({ transaction: t });
      });
      return res.status(200).json({ msg: 'Produto deletado com sucesso' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Erro ao deletar produto', erro: err });
    }
  },
};
