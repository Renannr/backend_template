import { STRING, ENUM } from 'sequelize';

export default function (sequelize) {
  const Produto = sequelize.define(
    'Produto',
    {
      codigo: {
        type: STRING(50),
      },
      nome: {
        type: STRING(50),
      },
      unidade: {
        type: ENUM('L', 'ml', 'kg', 'g', 'unidade'),
        allowNull: false,
        validate: {
          isIn: {
            args: [['L', 'ml', 'kg', 'g', 'unidade']],
            msg: 'Unidade deve ser um dos valores: L, ml, kg, g, unidade',
          },
        },
      },
      tipo: {
        type: ENUM('perecível', 'não perecível', 'frutas', 'legumes', 'outro'),
        allowNull: false,
        validate: {
          isIn: {
            args: [['perecível', 'não perecível', 'frutas', 'legumes', 'outro']],
            msg: 'Tipo deve ser um dos valores: perecível, não perecível, frutas, legumes, outro',
          },
        },
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
    }
  );

  return Produto;
}
