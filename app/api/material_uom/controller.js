"use strict";

import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = constants.http.status;

const create = async (req, res) => {
  res.send({ status: true, data: await table.MaterialUomModel.create(req) });
};

const get = async (req, res) => {
  res.send({ status: true, data: await table.MaterialUomModel.get(req) });
};

const getById = async (req, res) => {
  const record = await table.MaterialUomModel.getById(req);
  if (!record) return ErrorHandler({ code: NOT_FOUND, message: "Not found!" });

  res.send({ status: true, data: record });
};

const deleteById = async (req, res) => {
  const record = await table.MaterialUomModel.get(req);
  if (!record) return ErrorHandler({ code: NOT_FOUND, message: "Not found!" });

  res.send({
    status: true,
    data: await table.MaterialUomModel.deleteById(req),
  });
};

const update = async (req, res) => {
  const record = await table.MaterialUomModel.get(req);
  if (!record) return ErrorHandler({ code: NOT_FOUND, message: "Not found!" });

  res.send({ status: true, data: await table.MaterialUomModel.update(req) });
};

export default {
  create: create,
  get: get,
  getById: getById,
  deleteById: deleteById,
  update: update,
};
