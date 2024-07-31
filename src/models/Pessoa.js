import { STRING, ENUM } from 'sequelize';

export default function (sequelize) {
  const Pessoa = sequelize.define(
    'Pessoa',
    {
      nome: {
        type: STRING(50),
        allowNull: false,
        notEmpty: true,
      },
      sobrenome: {
        type: STRING(50),
        allowNull: false,
        notEmpty: true,
      },
      cpf: {
        type: STRING(11),
        allowNull: false,
        unique: true,
        validate: {
          is: /^\d{11}$/,
          notEmpty: true,
        },
      },
      telefone: {
        type: STRING(20),
        allowNull: false,
        notEmpty: true,
      },
      cargo: {
        type: ENUM('Supervisor', 'Merendeira', 'Auxiliar', 'Outro'),
        allowNull: false,
        validate: {
          isIn: {
            args: [['Supervisor', 'Merendeira', 'Auxiliar', 'Outro']],
            msg: 'Cargo deve ser um dos valores: Supervisor, Merendeira, Auxiliar ou Outro',
          },
        },
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
    }
  );

  Pessoa.associate = (models) => {
    Pessoa.hasMany(models.Endereco, { foreignKey: 'pessoa_id' });
    Pessoa.hasOne(models.Credencial, { foreignKey: 'pessoa_id' });
  };

  return Pessoa;
}
