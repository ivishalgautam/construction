"use strict";

import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { INTERNAL_SERVER_ERROR, NOT_FOUND } = constants.http.status;

const create = async (req, res) => {
  try {
    res.send(await table.WorkCategoryModel.create(req));
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const record = await table.WorkCategoryModel.getById(req);
    if (!record) return res.code(NOT_FOUND).send({ message: "not found!" });

    res.send(await table.WorkCategoryModel.update(req));
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.WorkCategoryModel.getById(req);
    if (!record) return res.code(NOT_FOUND).send({ message: "not found!" });

    await table.WorkCategoryModel.deleteById(req);
    res.send({ message: "Deleted" });
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.WorkCategoryModel.getById(req);
    if (!record) return res.code(NOT_FOUND).send({ message: "not found!" });

    res.send(record);
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const get = async (req, res) => {
  try {
    res.send(await table.WorkCategoryModel.get(req));
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

export default {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};
