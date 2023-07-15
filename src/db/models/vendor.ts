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

class Vendor extends Model<
  InferAttributes<Vendor>,
  InferCreationAttributes<Vendor>
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

const initialize = (sequelizeDAO: Sequelize) => {
  Vendor.init(
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
      modelName: "Vendor",
      tableName: "vendors",
      underscored: true,
    }
  );

  //associate(sequelizeDAO.models);
};

const associate = (models: Sequelize["models"]) => {
  console.log("Vendor associate models === ", models);
  Vendor.hasMany(models.Employee);
};

module.exports = { initialize, associate };

export default Vendor;
