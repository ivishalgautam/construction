"use strict";
import { DataTypes, Deferrable } from "sequelize";
import constants from "../../lib/constants/index.js";

// ? this will go in site transfer
let IssuedItemModel = null;

const init = async (sequelize) => {
  IssuedItemModel = sequelize.define(
    constants.models.ISSUED_ITEM_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      site_transfer_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.SITE_TRANSFER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
      grn_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.SITE_TRANSFER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Quantity must be integer!" },
        },
      },
      pending_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Quantity must be integer!" },
        },
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await IssuedItemModel.sync({ alter: true });
};

const create = async (req) => {
  return await IssuedItemModel.create(
    {
      material_id: req.body.material_id,
      site_transfer_id: req.body.site_transfer_id,
      grn_id: req.body.grn_id,
      quantity: req.body.quantity,
      pending_quantity: req.body.quantity,
    },
    { returning: true, raw: true }
  );
};

const update = async (req, id) => {
  const [rowCount, rows] = await IssuedItemModel.update(
    {
      pending_quantity: req.body.quantity,
    },
    {
      where: { id: req.params.id || id },
      returning: true,
      plain: true,
    }
  );

  return rows;
};

const getById = async (req, id) => {
  return await IssuedItemModel.findOne({
    where: { id: req.parms.id || id },
    raw: true,
  });
};

const getBySiteTransferId = async (req, id) => {
  return await IssuedItemModel.findAll({
    where: { site_transfer_id: req.parms.id || id },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  getBySiteTransferId: getBySiteTransferId,
};
