"use strict";
import { DataTypes, Deferrable, Op } from "sequelize";
import constants from "../../lib/constants/index.js";

// this will go in site transfer received items
let ReceivedItemModel = null;

const init = async (sequelize) => {
  ReceivedItemModel = sequelize.define(
    constants.models.RECEIVED_ITEM_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      issued_item_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.ISSUED_ITEM_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
      received_by: {
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
      transferred_quantity: {
        type: DataTypes.FLOAT(0),
        allowNull: false,
        validate: {
          isFloat: true,
        },
      },
      received_quantity: {
        type: DataTypes.FLOAT(0),
        allowNull: false,
        validate: {
          isFloat: true,
        },
      },
      // grn_id:{}, // !will add later
    },
    { createdAt: "created_at", updatedAt: "updated_at" }
  );

  await ReceivedItemModel.sync({ alter: true });
};

const create = async (req) => {
  return await ReceivedItemModel.create(
    {
      site_transfer_id: req.body.site_transfer_id,
      material_id: req.body.material_id,
      issued_item_id: req.body.issued_item_id,
      received_by: req.user_data.id,
      transferred_quantity: req.body.transferred_quantity,
      received_quantity: req.body.received_quantity,
      grn_id: req.body.grn_id,
    },
    {
      returning: true,
      raw: true,
    }
  );
};

const update = async (req, id) => {
  const [rowsCount, rows] = await ReceivedItemModel.update(
    {
      transferred_quantity: req.body.transferred_quantity,
      received_quantity: req.body.received_quantity,
    },
    { where: { id: req.params.id || id }, plain: true }
  );

  return rows;
};

const getById = async (req, id) => {
  return await ReceivedItemModel.findOne({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const getBySiteTransferId = async (req, id) => {
  return await ReceivedItemModel.findAll({
    where: { site_transfer_id: req.params.id || id },
    raw: true,
  });
};

const deleteById = async (req, id) => {
  return await ReceivedItemModel.destroy({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const countTotalQtyBySiteTransferId = async (id) => {
  return await ReceivedItemModel.sequelize({
    atributes: [
      [
        ReceivedItemModel.sequelize.fn(
          "COUNT",
          ReceivedItemModel.sequelize.col("reeived_quantity")
        ),
        "total",
      ],
    ],
    where: {
      site_transfer_id: {
        [Op.eq]: id,
      },
    },
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  getBySiteTransferId: getBySiteTransferId,
  deleteById: deleteById,
  countTotalQtyBySiteTransferId: countTotalQtyBySiteTransferId,
};
