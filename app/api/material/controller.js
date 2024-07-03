"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = constants.http.status;

const create = async (req, res) => {
  const record = await table.MaterialModel.create(req);

  const inStockQuantity = req.body.in_stock_quantity;

  if (record && inStockQuantity && inStockQuantity > 0) {
    await table.InventoryTransactionModel.create({
      ...req,
      body: {
        material_id: record.material_id,
        transaction_type: "added",
        transaction_amount: inStockQuantity,
        in_stock_amount: inStockQuantity,
      },
    });
  }

  res.send(record);
};

const update = async (req, res) => {
  const record = await table.MaterialModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Material not found!" });

  res.send(record);
};

const deleteById = async (req, res) => {
  const record = await table.MaterialModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Material not found!" });

  res.send(await table.MaterialModel.deleteById(req));
};

const getById = async (req, res) => {
  const record = await table.MaterialModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Material not found!" });

  res.send(record);
};

const getByProjectId = async (req, res) => {
  const record = await table.ProjectModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Project not found!" });

  res.send(await table.MaterialModel.getByProjectId(req));
};

const get = async (req, res) => {
  res.send(await table.MaterialModel.get(req));
};

export default {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  getByProjectId: getByProjectId,
  get: get,
};
