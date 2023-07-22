import express, { ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { sequelizeDAO, syncSeqeulize } from "./db";
import indexRouter from "./api/routes";
import vendorRouter from "./api/routes/vendor";

dotenv.config();
const app = express();

syncSeqeulize();

app.set("port", process.env.PORT || 4014);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/vendor", vendorRouter);
app.use("/", indexRouter);

app.use((req, res, next) => {
  res
    .status(404)
    .json({ code: 404, message: `${req.method} ${req.url} does not exists` });
});

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  console.log();

  const err = new Error(error.messgae);
  err.status = error.status;

  res.status(500).json({ code: 500, message: err.message });
};
app.use(errorMiddleware);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "포트 대기 중");
});

export default app;
