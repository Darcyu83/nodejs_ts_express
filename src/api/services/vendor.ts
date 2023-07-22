import { RequestHandler } from "express";

import Employee from "../../db/models/employee";
import db from "../../db";

class VendorServices {
  static getVendorList = async () => {
    const result = await db.VendorModel.findAndCountAll({
      include: {
        model: db.EmployeeModel,
      },
      limit: 10,
    });

    return result;
  };
}

export default VendorServices;
