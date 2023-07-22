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

const models: { [key: string]: any } = {};

// 모델 init
const folderPath = path.join(__dirname, "models");
fs.readdirSync(folderPath).forEach(async (filename) => {
  // 모델 파일 import 하면서 init association 처리
  const { initialize } = await import(path.join(folderPath, filename));
  const instance = initialize(sequelizeDAO);

  models[instance.name] = instance;
});

// 모델 관계 Associated
fs.readdirSync(folderPath).forEach(async (filename) => {
  console.log("fs.readFile ::", path.join(folderPath, filename));
  // 모델 파일 import 하면서 init association 처리
  const { associate } = await import(path.join(folderPath, filename));

  associate(sequelizeDAO.models);
});

export const syncSeqeulize = () =>
  sequelizeDAO.query("SET FOREIGN_KEY_CHECKS = 0").then(() => {
    sequelizeDAO
      .sync({
        // force: true,
        alter: true,
      })
      .then((e) => {
        console.log("keys ===== ", models);
        sequelizeDAO.query("SET FOREIGN_KEY_CHECKS = 1");
      })
      .catch((err) => console.log("시퀄라이즈 싱크 === 오류 ", err));
  });

export default models;
