import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 4014);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", (req, res, next) => {
  res.status(200).json({ message: "OK" });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "포트 대기 중");
});
