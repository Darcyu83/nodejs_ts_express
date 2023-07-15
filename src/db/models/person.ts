import {
  Attributes,
  CreationAttributes,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

class Person extends Model<
  InferAttributes<Person>,
  InferCreationAttributes<Person>
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

const initialize = (sequelizeDAO: Sequelize) => {
  Person.init(
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
      modelName: "Person",
      tableName: "person",
    }
  );
  //associate(sequelizeDAO.models);
};

const associate = (models: Sequelize["models"]) => {
  console.log("Person associate models === ", models);
  Person.hasMany(models.Mail, { foreignKey: "mail_sent" });
  // Person.hasMany(Mail, { foreignKey: "mail_received" });
};

module.exports = { initialize, associate };
export default Person;
