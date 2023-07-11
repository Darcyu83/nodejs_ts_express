import { title } from "process";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import Employee from "./employee";
import { sequelizeDAO } from "..";

class Mail extends Model<InferAttributes<Mail>, InferCreationAttributes<Mail>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
}

Mail.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
  },
  {
    sequelize: sequelizeDAO,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

Mail.belongsTo(Employee, { as: "sender" });
Mail.belongsTo(Employee, { as: "receiver" });

export default Mail;
