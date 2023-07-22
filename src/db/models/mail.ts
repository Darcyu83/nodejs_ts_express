import { title } from "process";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class MailModel extends Model<
  InferAttributes<MailModel>,
  InferCreationAttributes<MailModel>
> {
  declare id: CreationOptional<number>;
  declare email: string;
}

export const initialize = (sequelizeDAO: Sequelize) => {
  return MailModel.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING },
    },
    {
      sequelize: sequelizeDAO,
      timestamps: true,
      paranoid: true,
      underscored: true,
      modelName: "MailModel",
      tableName: "mail",
    }
  );
  //associate(sequelizeDAO.models);
};

export const associate = (models: Sequelize["models"]) => {
  console.log("MailModel associate models === ", models);
  // MailModel.belongsTo(models.Person);
  // MailModel.belongsTo(Person, { as: "sender" });
  MailModel.belongsTo(models.PersonModel, { as: "receiver" });
};

export default MailModel;
