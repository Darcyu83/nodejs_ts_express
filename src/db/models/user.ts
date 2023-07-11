import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelizeDAO } from "..";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
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
User.init(
  {
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
  },
  { sequelize: sequelizeDAO, underscored: true }
);

// console.log(User.classLevelMethod()); // 'foo'
// const user = User.build({ firstname: "Jane", lastname: "Doe" });
// console.log(user.instanceLevelMethod()); // 'bar'
// console.log(user.getFullname()); // 'Jane Doe'
