import express from "express";
import { createVendor, getVendorsWithDetails } from "../controllers/vendor";

const vendorRouter = express.Router();

vendorRouter.post("/", createVendor);
vendorRouter.get("/", getVendorsWithDetails);

export default vendorRouter;
