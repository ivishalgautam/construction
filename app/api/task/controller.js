"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = constants.http.status;

const create = async (req, res) => {
  const record = await table.TaskModel.create(req);
  res.send(record);
};

const update = async (req, res) => {
  const record = await table.TaskModel.getById(req);
  if (!record) ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send({ status: true, data: await table.TaskModel.update(req) });
};

const getById = async (req, res) => {
  const record = await table.TaskModel.getById(req);
  if (!record) ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send({ status: true, data: record });
};

const getByProjectId = async (req, res) => {
  const record = await table.ProjectModel.getById(req);
  if (!record) ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send({ status: true, data: await table.TaskModel.getByProjectId(req) });
};

const deleteById = async (req, res) => {
  const record = await table.TaskModel.getById(req);
  if (!record) ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  await table.TaskModel.deleteById(req);

  res.send({ status: true, message: "Task deleted." });
};

const get = async (req, res) => {
  res.send({ status: true, data: await table.TaskModel.get(req) });
};

export default {
  create: create,
  update: update,
  getById: getById,
  getByProjectId: getByProjectId,
  deleteById: deleteById,
  get: get,
};
