import { RequestHandler } from "express";
import Vendor from "../../db/models/vendor";

export const createVendor: RequestHandler = async (req, res, next) => {
  const vendor = await Vendor.create({
    name: "A 주식회사",
    employeeNum: 100,
    lat: 32.91,
    lon: 128.91,
  });

  res
    .status(201)
    .json({ code: 201, message: "Success to create a vendor", data: vendor });
};
