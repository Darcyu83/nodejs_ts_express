import {
  CreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { sequelizeDAO } from "..";

import { Hash } from "crypto";

class Employee extends Model<
  InferAttributes<Employee>,
  InferCreationAttributes<Employee>
> {
  declare id: CreationOptional<number>;
  declare loginId: string;
  declare pwd: string;
  declare name: string;
  declare birth: string;
  declare age: number;
  declare workYears: number;
  declare dept: number;
}

const initialize = (sequelizeDAO: Sequelize) => {
  Employee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,

        primaryKey: true,
      },
      loginId: {
        type: DataTypes.STRING,
        field: "login_id",
        allowNull: false,
        comment: "로그인 아이디",
      },
      pwd: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("pwd", this.name + value); //해쉬 처리할 곳
        },
        allowNull: false,
        comment: "비밀번호",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "직원 이름",
      },
      birth: {
        type: DataTypes.STRING(8),
        allowNull: false,
        comment: "생년월일 : 20000409",
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      workYears: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        // field: "work_years",
      },
      dept: { type: DataTypes.STRING },
    },
    {
      sequelize: sequelizeDAO,
      timestamps: true,
      paranoid: true,
      tableName: "employee",
      modelName: "Employee",
      // underscored: true,
    }
  );
  //associate(sequelizeDAO.models);
};

const associate = (models: Sequelize["models"]) => {
  console.log("Employee associate models === ", models);
  Employee.belongsTo(models.Vendor, { targetKey: "id" });
};

module.exports = { initialize, associate };
export default Employee;
