import { RequestHandler } from "express";
import Vendor from "../../db/models/vendor";

export const getVendorList: RequestHandler = async (req, res, next) => {
  const result = await Vendor.findAndCountAll({ limit: 10 });

  res.status(200).json({ code: 200, data: result.rows, total: result.count });
};
