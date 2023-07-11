import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export const sequelizeDAO = new Sequelize({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER_NAME,
  dialect: process.env.DB_DIALECT as Dialect,
  logging: console.log,
});

const folderPath = path.join(__dirname, "models");
fs.readdirSync(folderPath).forEach((filename) => {
  console.log("fs.readFile ", path.join(folderPath, filename));

  // 모델 파일 import 하면서 init association 처리
  require(path.join(folderPath, filename));
});

export default sequelizeDAO;
