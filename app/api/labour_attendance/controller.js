"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND } = constants.http.status;

const create = async (req, res) => {
  const labourRecord = await table.LabourModel.getById(req, req.body.labour_id);
  if (!labourRecord)
    return ErrorHandler({ code: NOT_FOUND, message: "Labour not found!" });

  const projectRecord = await table.ProjectModel.getById(
    req,
    req.body.project_id
  );
  if (!projectRecord)
    return ErrorHandler({ code: NOT_FOUND, message: "Project not found!" });

  res.send({
    status: true,
    data: await table.LabourAttendanceModel.create(req),
  });
};

const update = async (req, res) => {
  const record = await table.LabourModel.getById(req);
  if (!record)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Labour attendance not found!",
    });

  res.send({
    status: true,
    data: await table.LabourAttendanceModel.update(req),
  });
};

const getById = async (req, res) => {
  const record = await table.LabourModel.getById(req);
  if (!record)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Labour attendance not found!",
    });

  res.send({ status: true, data: record });
};

const getByProjectAndDate = async (req, res) => {
  const record = await table.ProjectModel.getById(req);
  if (!record)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Project not found!",
    });

  res.send({
    status: true,
    data: await table.LabourAttendanceModel.getByProjectAndDate(req),
  });
};

export default {
  create: create,
  update: update,
  getById: getById,
  getByProjectAndDate: getByProjectAndDate,
};
