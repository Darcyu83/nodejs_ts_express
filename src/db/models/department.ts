import {
  CreationOptional,
  DataTypes,
  Deferrable,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelizeDAO } from "..";

class Department extends Model<
  InferAttributes<Department>,
  InferCreationAttributes<Department>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare affiliation: ForeignKey<Department["id"]>;
}

Department.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    affiliation: {
      type: DataTypes.INTEGER,
      references: {
        model: Department,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeDAO,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
export default Department;
