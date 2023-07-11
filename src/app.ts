import express, { ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { sequelizeDAO } from "./db";
import indexRouter from "./api/routes";
import vendorRouter from "./api/routes/vendor";

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 4014);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

sequelizeDAO.query("SET FOREIGN_KEY_CHECKS = 0").then(() => {
  sequelizeDAO
    .sync({
      // force: true,
      alter: true,
    })
    .then((e) => {
      console.log("시퀄라이즈 싱크 === 성공", e.models);
      sequelizeDAO.query("SET FOREIGN_KEY_CHECKS = 1");
    })
    .catch((err) => console.log("시퀄라이즈 싱크 === 오류 ", err));
});

app.use("/vendor", vendorRouter);
app.use("/", indexRouter);

app.use((req, res, next) => {
  res
    .status(404)
    .json({ code: 404, message: `${req.method} ${req.url} does not exists` });
});

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  console.log();
};
app.use(errorMiddleware);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "포트 대기 중");
});
