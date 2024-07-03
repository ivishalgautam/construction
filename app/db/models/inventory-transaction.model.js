"use strict";

import constants from "../../lib/constants/index.js";
import sequelizeFwk, { DataTypes, Deferrable } from "sequelize";

// ? this will create inventory stock transaction entry as transaction when stock added or used
let InventoryTransactionModel = null;

const init = async (sequelize) => {
  InventoryTransactionModel = sequelize.define(
    constants.models.INVENTORY_TRANSACTION_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      material_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.MATERIAL_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
      transaction_type: {
        type: DataTypes.ENUM("added", "used"),
        allowNull: false,
      },
      transaction_amount: {
        type: DataTypes.FLOAT(2),
        allowNull: false,
      },
      in_stock_amount: {
        type: DataTypes.FLOAT(2),
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      reason: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
    }
  );
};

const create = async (req) => {
  return await InventoryTransactionModel.create(
    {
      material_id: req.body.material_id,
      user_id: req.user_data.id,
      transaction_type: req.body.transaction_type,
      transaction_amount: req.body.transaction_amount,
      in_stock_amount: req.body.in_stock_amount,
    },
    { returning: true, raw: true }
  );
};

const update = async (req, id) => {
  return await InventoryTransactionModel.update(
    {
      material_id: req.body.material_id,
      user_id: req.user_data.id,
      transaction_type: req.body.transaction_type,
      transaction_amount: req.body.transaction_amount,
      in_stock_amount: req.body.in_stock_amount,
    },
    { where: { id: req.params.id || id }, returning: true, raw: true }
  );
};

const getById = async (req, id) => {
  return await InventoryTransactionModel.findOne({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const getByMaterialId = async (req, id) => {
  return await InventoryTransactionModel.findAll({
    where: { material_id: req.params.id || id },
    raw: true,
  });
};

const deleteById = async (req, id) => {
  return await InventoryTransactionModel.update(
    { is_deleted: true, reason: req.body.reason },
    {
      where: { id: req.params.id || id },
    }
  );
};

const get = async (req) => {
  return await InventoryTransactionModel.get({});
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  getByMaterialId: getByMaterialId,
  deleteById: deleteById,
  get: get,
};
