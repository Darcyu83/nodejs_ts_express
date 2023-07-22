import { RequestHandler } from "express";

import VendorServices from "../services/vendor";
import { TupleType } from "typescript";

const a = { DEV: "", PRD: "" };

export const getVendorList: RequestHandler = async (req, res, next) => {
  try {
    const result = await VendorServices.getVendorList();

    res.status(200).json({ code: 200, data: result.rows, total: result.count });
  } catch (error) {
    console.log("getVendorList ==== ", error);
    next(error);
  }
};
