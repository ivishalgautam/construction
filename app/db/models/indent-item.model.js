"use strict";
import { DataTypes, Deferrable } from "sequelize";
import constants from "../../lib/constants/index.js";

let IndentItemModel = null;

const init = async (sequelize) => {
  IndentItemModel = sequelize.define(
    constants.models.INDENT_ITEM_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      indent_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.INDENT_TABLE,
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
      requested: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await IndentItemModel.sync({ alter: true });
};

const create = async (req) => {
  return await IndentItemModel.create(
    {
      indent_id: req.body.indent_id,
      material_id: req.body.material_id,
      requested: req.body.requested,
    },
    {
      returning: true,
      raw: true,
    }
  );
};

const update = async (req, id) => {
  return await IndentItemModel.update(
    {
      indent_id: req.body.indent_id,
      material_id: req.body.material_id,
      requested: req.body.requested,
    },
    {
      where: { id: req.params.id || id },
      returning: true,
      raw: true,
    }
  );
};

const getById = async (req, id) => {
  return await IndentItemModel.findOne({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const get = async (req, id) => {
  return await IndentItemModel.findAll({});
};

const deleteById = async (req, id) => {
  return await IndentItemModel.destroy({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const getByIndentId = async (req, id) => {
  return await IndentItemModel.findAll({
    where: { indent_id: req.params.id || id },
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  get: get,
  deleteById: deleteById,
  getByIndentId: getByIndentId,
};
