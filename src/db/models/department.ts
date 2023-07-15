import {
  CreationOptional,
  DataTypes,
  Deferrable,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
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

const initialize = (sequelizeDAO: Sequelize) => {
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
      tableName: "department",
      modelName: "Department",
    }
  );
  //associate(sequelizeDAO.models);
};

const associate = (models: Sequelize["models"]) => {
  console.log("Department associate models === ", models);
};

module.exports = { initialize, associate };
export default Department;
