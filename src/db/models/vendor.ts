import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "..";

class Vendor extends Model<
  InferAttributes<Vendor>,
  InferCreationAttributes<Vendor>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare employee_num: number;
}

Vendor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    employee_num: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "Vendor",
    tableName: "vendors",
  }
);

export default Vendor;
