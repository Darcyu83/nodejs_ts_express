import { RequestHandler } from "express";

import Employee from "../../db/models/employee";
import models from "../../db";

class VendorServices {
  static getVendorList = async () => {
    const result = await models.VendorModel.findAndCountAll({
      include: {
        model: models.EmployeeModel,
      },
      limit: 10,
    });

    return result;
  };
}

export default VendorServices;
