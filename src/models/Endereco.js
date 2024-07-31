import { STRING } from 'sequelize';

export default function (sequelize) {
  const Endereco = sequelize.define(
    'Endereco',
    {
      logradouro: {
        type: STRING(60),
        allowNull: false,
      },
      complemento: {
        type: STRING(60),
      },
      cidade: {
        type: STRING(60),
        allowNull: false,
      },
      estado: {
        type: STRING(60),
        allowNull: false,
      },
      pais: {
        type: STRING(60),
        allowNull: false,
      },
      codigo_postal: {
        type: STRING(15),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
    }
  );

  Endereco.associate = (models) => {
    Endereco.belongsTo(models.Pessoa, { foreignKey: 'pessoa_id' });
  };

  return Endereco;
}
