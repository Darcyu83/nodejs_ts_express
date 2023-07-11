import express from "express";
import { createVendor } from "../controllers/vendor";

const vendorRouter = express.Router();

vendorRouter.post("/", createVendor);

export default vendorRouter;
