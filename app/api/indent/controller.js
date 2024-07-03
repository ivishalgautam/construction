"use strict";
import constants from "../../lib/constants/index.js";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = constants.http.status;

const create = async (req, res) => {
  const record = await table.ProjectModel.getById(req, req.body.project_id);

  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Project not found!" });

  const indent = await table.IndentModel.create(req);

  if (indent) {
    await Promise.all(
      req.body.items.map(async (item) => {
        await table.IndentItemModel.create({
          body: {
            indent_id: indent.id,
            material_id: item.material_id,
            requested: item.requested,
          },
        });
      })
    );
  }

  res.send(record);
};

const update = async (req, res) => {
  const record = await table.IndentModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Indent not found!" });

  res.send(await table.IndentModel.update(req));
};

const getByProjectId = async (req, res) => {
  const record = await table.ProjectModel.create(req, req.body.project_id);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Project not found!" });

  res.send(await table.IndentModel.getByProjectId(req));
};

const get = async (req, res) => {
  res.send(await table.IndentModel.get(req));
};

const getById = async (req, res) => {
  const record = await table.IndentModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Indent not found!" });

  res.send(record);
};

const deleteById = async (req, res) => {
  const record = await table.IndentModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Indent not found!" });

  res.send(await table.IndentModel.deleteById(req));
};

export default {
  create: create,
  update: update,
  getByProjectId: getByProjectId,
  get: get,
  getById: getById,
  deleteById: deleteById,
};
