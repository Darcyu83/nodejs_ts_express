import { RequestHandler } from "express";

import { CreationAttributes, ModelStatic, Sequelize } from "sequelize";

import Models, { sequelizeDAO } from "../../db";
import Vendor from "../../db/models/vendor";
import Employee from "../../db/models/employee";

const { Vendor: vendo, Employee: emp } = sequelizeDAO.models;

export const createVendor: RequestHandler = async (req, res, next) => {
  // Sequelize.fn();

  console.log("createVendor ----  ", sequelizeDAO.models.Vendor);
  const vendorExisting = await vendo.findAll({
    where: {},
    // include: { model: Employee, attributes: [""] },
  });
  const vendor = await vendo.create({
    name: "A 주식회사",
    employeeNum: 100,
    lat: 32.91,
    lon: 128.91,
  });

  const result = await emp.create({
    age: 22,
    birth: "20231231",
    dept: 1,
    loginId: "yuds",
    name: "유대석",
    pwd: "1234",
    workYears: 10,
  });

  res.status(201).json({
    code: 201,
    message: "Success to create a vendor",
    data: { vendor, result },
  });
};

export const getVendorsWithDetails: RequestHandler = async (req, res, next) => {
  try {
    const result = await vendo.findAll({
      include: { model: Employee },
    });

    res.status(200).json({ code: 200, data: result });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
