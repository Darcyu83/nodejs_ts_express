import {
  CreationOptional,
  DataTypes,
  Deferrable,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelStatic,
  Sequelize,
} from "sequelize";

class DepartmentModel extends Model<
  InferAttributes<DepartmentModel>,
  InferCreationAttributes<DepartmentModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare affiliation: ForeignKey<DepartmentModel["id"]>;
}

export const initialize = (sequelizeDAO: Sequelize) => {
  return DepartmentModel.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      affiliation: {
        type: DataTypes.INTEGER,
        references: {
          model: DepartmentModel,
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
      modelName: "DepartmentModel",
    }
  );
  //associate(sequelizeDAO.models);
};

export const associate = (models: Sequelize["models"]) => {
  console.log("DepartmentModel associate models === ", models);
};

export default DepartmentModel;
