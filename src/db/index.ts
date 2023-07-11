import { Dialect, Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  password: process.env.PASSWORD,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER_NAME,
  dialect: process.env.DIALECT as Dialect,
});
