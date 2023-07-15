import {
  Attributes,
  DataTypes,
  Dialect,
  Model,
  ModelCtor,
  ModelDefined,
  ModelStatic,
  Sequelize,
} from "sequelize";
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

// 모델 init
const folderPath = path.join(__dirname, "models");
fs.readdirSync(folderPath).forEach((filename) => {
  console.log("fs.readFile ::", path.join(folderPath, filename));
  // 모델 파일 import 하면서 init association 처리
  const model = require(path.join(folderPath, filename));

  console.log("fs.readFile ::", model);
  model.initialize(sequelizeDAO);
});

// 모델 관계 Associated
fs.readdirSync(folderPath).forEach((filename) => {
  console.log("fs.readFile ::", path.join(folderPath, filename));
  // 모델 파일 import 하면서 init association 처리
  const model = require(path.join(folderPath, filename));
  model.associate(sequelizeDAO.models);
});

export let Models: {
  [key: string]: ModelStatic<Model>;
} = {};

export const syncSeqeulize = () =>
  sequelizeDAO.query("SET FOREIGN_KEY_CHECKS = 0").then(() => {
    sequelizeDAO
      .sync({
        // force: true,
        alter: true,
      })
      .then((e) => {
        console.log("시퀄라이즈 싱크 === 성공", e.models);
        Models = { ...e.models };
        Object.keys(e.models).map((key) => {
          const modelNm = e.models[key].name;
          const model = e.models[key];
          console.log(
            e.models[key].name,
            "associations ==== ",
            e.models[key].associations
          );
        });

        console.log("시퀄라이즈 싱크 === 성공 ===  Models", Models.Vendor);
        sequelizeDAO.query("SET FOREIGN_KEY_CHECKS = 1");
      })
      .catch((err) => console.log("시퀄라이즈 싱크 === 오류 ", err));
  });
export default sequelizeDAO;
