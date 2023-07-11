import {
  CreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "..";
import Vendor from "./vendor";
import Department from "./department";

class Employee extends Model<
  InferAttributes<Employee>,
  InferCreationAttributes<Employee>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare age: number;
  declare work_years: number;
  declare dept: ForeignKey<Department["id"]>;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    work_years: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    dept: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    tableName: "employees",
    modelName: "Employee",
  }
);

Employee.belongsTo(Vendor);
export default Employee;
