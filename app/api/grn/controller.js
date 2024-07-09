"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND } = constants.http.status;

const getByProjectId = async (req, res) => {
  const record = await table.ProjectModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Project not found!" });

  res.send({ status: true, data: await table.GrnModel.getByProjectId(req) });
};

export default {
  getByProjectId: getByProjectId,
};
