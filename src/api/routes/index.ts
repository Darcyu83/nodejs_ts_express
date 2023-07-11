import express from "express";
import { getVendorList } from "../controllers";

const indexRouter = express.Router();

indexRouter.get("/", getVendorList);

export default indexRouter;
