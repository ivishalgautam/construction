"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND } = constants.http.status;

const create = async (req, res) => {
  res.send(await table.LabourModel.create(req));
};

const update = async (req, res) => {
  const record = await table.LabourModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Labour not found!" });

  res.send({ status: true, data: await table.LabourModel.update(req) });
};

const getById = async (req, res) => {
  const record = await table.LabourModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Labour not found!" });

  res.send({ status: true, data: record });
};

const getByProjectId = async (req, res) => {
  const record = await table.ProjectModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Project not found!" });

  res.send({ status: true, data: await table.LabourModel.getByProjectId(req) });
};

const deleteById = async (req, res) => {
  const record = await table.LabourModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Labour not found!" });

  res.send({ status: true, data: await table.LabourModel.deleteById(req) });
};

const get = async (req, res) => {
  res.send({ status: true, data: await table.LabourModel.get(req) });
};

export default {
  create: create,
  update: update,
  getById: getById,
  getByProjectId: getByProjectId,
  deleteById: deleteById,
  get: get,
};
