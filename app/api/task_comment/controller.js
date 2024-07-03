"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = constants.http.status;

const create = async (req, res) => {
  const record = await table.TaskModel.getById(req, req.body.task_id);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send(await table.TaskCommentModel.create(req));
};

const update = async (req, res) => {
  const record = await table.TaskCommentModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Comment not found!" });

  res.send(await table.TaskCommentModel.update(req));
};

const getById = async (req, res) => {
  const record = await table.TaskCommentModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Comment not found!" });

  res.send(record);
};

const getByTaskId = async (req, res) => {
  const record = await table.TaskModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send(await table.TaskCommentModel.getByTaskId(req));
};

const deleteById = async (req, res) => {
  const record = await table.TaskCommentModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Comment not found!" });

  res.send(await table.TaskCommentModel.deleteById(req));
};

export default {
  create: create,
  update: update,
  getById: getById,
  getByTaskId: getByTaskId,
  deleteById: deleteById,
};
