"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = constants.http.status;

const create = async (req, res) => {
  const record = await table.MaterialModel.getById(req, req.body.material_id);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Material not found!" });

  const currInStockAmt = record.in_stock_quantity;
  const newTransAmt = req.body.transaction_amount;

  const inStockAmt =
    req.body.transaction_type === "added"
      ? currInStockAmt + newTransAmt
      : currInStockAmt - newTransAmt;

  const newTran = await table.InventoryTransactionModel.create({
    req: {
      body: {
        material_id: record.id,
        transaction_type: req.body.transaction_type,
        transaction_amount: req.body.transaction_amount,
        in_stock_amount: inStockAmt,
      },
    },
  });

  if (newTran) {
    await table.MaterialModel.update({
      params: { id: record.id || req.body.material_id },
      body: { in_stock_quantity: inStockAmt },
    });
  }

  res.send(newTran);
};

const deleteById = async (req, res) => {
  const transactionRecord = await table.InventoryTransactionModel.getById(req);
  if (!transactionRecord)
    return ErrorHandler({ code: NOT_FOUND, message: "Material not found!" });

  const materialRecord = await table.MaterialModel.getById(
    req,
    req.body.material_id
  );
  if (!materialRecord)
    return ErrorHandler({ code: NOT_FOUND, message: "Transaction not found!" });

  const currInStockAmt = materialRecord.in_stock_quantity;
  const newTransAmt = transactionRecord.transaction_amount;

  const inStockAmt =
    transactionRecord.transaction_type === "added"
      ? currInStockAmt - newTransAmt
      : currInStockAmt + newTransAmt;

  const deleteConfirmation = await table.InventoryTransactionModel.deleteById(
    req
  );

  if (deleteConfirmation) {
    await table.MaterialModel.update({
      params: { id: materialRecord.id },
      body: { in_stock_quantity: inStockAmt },
    });
  }

  res.send({ message: "Transaction deleted." });
};

const getByMaterialId = async (req, res) => {
  const record = await table.MaterialModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Material not found!" });

  res.send(await table.InventoryTransactionModel.getByMaterialId(req));
};

export default {
  create: create,
  deleteById: deleteById,
  getByMaterialId: getByMaterialId,
};
