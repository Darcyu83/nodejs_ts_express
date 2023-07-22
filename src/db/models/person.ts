import {
  Attributes,
  CreationAttributes,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class PersonModel extends Model<
  InferAttributes<PersonModel>,
  InferCreationAttributes<PersonModel>
> {
  id?: string;
  firstname!: string;
  lastname!: string;

  static classLevelMethod() {
    return "foo";
  }
  instanceLevelMethod() {
    return "bar";
  }
  getFullname() {
    return [this.firstname, this.lastname].join(" ");
  }
}

export const initialize = (sequelizeDAO: Sequelize) => {
  return PersonModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: DataTypes.TEXT,
      lastname: DataTypes.TEXT,
    },
    {
      sequelize: sequelizeDAO,
      underscored: true,
      modelName: "PersonModel",
      tableName: "person",
    }
  );
  //associate(sequelizeDAO.models);
};

export const associate = (models: Sequelize["models"]) => {
  console.log("PersonModel associate models === ", models);
  PersonModel.hasMany(models.MailModel, { foreignKey: "mail_sent" });
  // PersonModel.hasMany(Mail, { foreignKey: "mail_received" });
};

export default PersonModel;
