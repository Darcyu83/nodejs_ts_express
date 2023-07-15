import { RequestHandler } from "express";
import Models, { sequelizeDAO } from "../../db";

export const getVendorList: RequestHandler = async (req, res, next) => {
  const result = await sequelizeDAO.models.Vendor.findAndCountAll({
    limit: 10,
  });

  res.status(200).json({ code: 200, data: result.rows, total: result.count });
};
