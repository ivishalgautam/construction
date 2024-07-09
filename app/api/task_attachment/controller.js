"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";
import fileController from "../upload_files/controller.js";

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = constants.http.status;

const create = async (req, res) => {
  const record = await table.TaskModel.getById(req, req.body.task_id);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send(await table.TaskAttachmentModel.create(req));
};

const getById = async (req, res) => {
  const record = await table.TaskAttachmentModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Attachment not found!" });

  res.send({ status: true, data: record });
};

const getByTaskId = async (req, res) => {
  const record = await table.TaskModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Task not found!" });

  res.send({
    status: true,
    data: await table.TaskAttachmentModel.getByTaskId(req),
  });
};

const deleteById = async (req, res) => {
  const record = await table.TaskAttachmentModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Attachment not found!" });

  const deletionSuccess = await table.TaskAttachmentModel.deleteById(req);
  if (deletionSuccess) {
    req.query.file_path = record.file;
    fileController.deleteFile(req);
    res.send({ status: true, message: "file deleted" });
  } else {
    return ErrorHandler({
      code: INTERNAL_SERVER_ERROR,
      message: "Error deleting file!",
    });
  }
};

export default {
  create: create,
  getById: getById,
  getByTaskId: getByTaskId,
  deleteById: deleteById,
};
