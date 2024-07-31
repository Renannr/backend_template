import { STRING, BOOLEAN } from 'sequelize';

export default function (sequelize) {
  const Credencial = sequelize.define(
    'Credencial',
    {
      email: {
        unique: true,
        type: STRING(150),
        allowNull: false,
        notEmpty: true,
      },
      password: {
        type: STRING(255),
        allowNull: false,
        notEmpty: true,
      },
      is_admin: {
        type: BOOLEAN,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
    }
  );

  Credencial.associate = (models) => {
    Credencial.belongsTo(models.Pessoa, { foreignKey: 'pessoa_id' });
  };

  return Credencial;
}
