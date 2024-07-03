"use strict";
import { DataTypes, Deferrable } from "sequelize";
import constants from "../../lib/constants/index.js";

let IndentModel = null;

const init = async (sequelize) => {
  IndentModel = sequelize.define(
    constants.models.INDENT_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      project_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.PROJECT_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      assigned_to: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      expected_delivery_date: {
        type: DataTypes.DATEONLY,
      },
      remark: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      status: {
        type: DataTypes.ENUM("requested", "received"),
        defaultValue: "requested",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await IndentModel.sync({ alter: true });
};

const create = async (req) => {
  return await IndentModel.create(
    {
      project_id: req.body.project_id,
      created_by: req.user_data.id,
      assigned_to: req.body.assigned_to,
      expected_delivery_date: req.body.expected_delivery_date,
      remark: req.body.remark,
    },
    { returning: true, raw: true }
  );
};

const update = async (req, id) => {
  return await IndentModel.update(
    {
      project_id: req.body.project_id,
      created_by: req.user_data.id,
      assigned_to: req.body.assigned_to,
      expected_delivery_date: req.body.expected_delivery_date,
      remark: req.body.remark,
      status: req.body.status,
    },
    { where: { id: req.params.id || id } }
  );
};

const get = async (req, id) => {
  return await IndentModel.get({
    where: { created_by: req.user_data.id || id },
    raw: true,
  });
};

const getById = async (req, id) => {
  return await IndentModel.get({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const getByProjectId = async (req, id) => {
  return await IndentModel.get({
    where: { project_id: req.params.id || id },
  });
};

const deleteById = async (req, id) => {
  return await IndentModel.delete({
    where: { id: req.params.id || id },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  get: get,
  getById: getById,
  getByProjectId: getByProjectId,
  deleteById: deleteById,
};
