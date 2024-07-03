"use strict";
import table from "../../db/models.js";
import constants from "../../lib/constants/index.js";
import { ErrorHandler } from "../../helpers/handleError.js";

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = constants.http.status;

const create = async (req, res) => {
  const record = await table.TaskModel.getById(req, req.body.task_id);

  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send(await table.TaskIssueModel.create(req));
};

const update = async (req, res) => {
  const record = await table.TaskIssueModel.getById(req);

  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task issue not found!" });

  res.send(await table.TaskIssueModel.update(req));
};

const getById = async (req, res) => {
  const record = await table.TaskIssueModel.getById(req);

  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task issue not found!" });

  res.send(record);
};

const getByTaskId = async (req, res) => {
  const record = await table.TaskModel.getById(req);

  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send(record);
};

const deleteById = async (req, res) => {
  const record = await table.TaskIssueModel.getById(req);

  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task issue not found!" });

  res.send(await table.TaskIssueModel.deleteById(req));
};

const get = async (req, res) => {
  res.send(await table.TaskIssueModel.get(req));
};

export default {
  create: create,
  update: update,
  getById: getById,
  getByTaskId: getByTaskId,
  deleteById: deleteById,
  get: get,
};
