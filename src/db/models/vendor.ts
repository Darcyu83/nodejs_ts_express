import {
  Attributes,
  CreationAttributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class VendorModel extends Model<
  InferAttributes<VendorModel>,
  InferCreationAttributes<VendorModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare employeeNum: number;
  declare lat: number;
  declare lon: number;
  // declare createdAt: CreationOptional<Date>;
  // declare updatedAt: CreationOptional<Date>;
  // declare created_at: CreationOptional<Date>;
  // declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelizeDAO: Sequelize) => {
  return VendorModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employeeNum: {
        type: DataTypes.INTEGER,
        // field: "employee_num",
        allowNull: true,
      },
      lat: DataTypes.FLOAT,
      lon: DataTypes.FLOAT,

      // created_at: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: DataTypes.NOW,
      // },
      // updated_at: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      // },
    },
    {
      sequelize: sequelizeDAO,
      timestamps: true,
      paranoid: true,
      modelName: "VendorModel",
      tableName: "vendors",
      underscored: true,
    }
  );

  //associate(sequelizeDAO.models);
};

export const associate = (models: Sequelize["models"]) => {
  console.log("Vendor associate models === ", models);
  VendorModel.hasMany(models.EmployeeModel);
};

export default VendorModel;
