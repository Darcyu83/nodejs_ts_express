import { title } from "process";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class Mail extends Model<InferAttributes<Mail>, InferCreationAttributes<Mail>> {
  declare id: CreationOptional<number>;
  declare email: string;
}

const initialize = (sequelizeDAO: Sequelize) => {
  Mail.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING },
    },
    {
      sequelize: sequelizeDAO,
      timestamps: true,
      paranoid: true,
      underscored: true,
      modelName: "Mail",
      tableName: "mail",
    }
  );
  //associate(sequelizeDAO.models);
};

const associate = (models: Sequelize["models"]) => {
  console.log("Mail associate models === ", models);
  // Mail.belongsTo(models.Person);
  // Mail.belongsTo(Person, { as: "sender" });
  Mail.belongsTo(models.Person, { as: "receiver" });
};

module.exports = { initialize, associate };
export default Mail;
