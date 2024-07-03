"use strict";
import { DataTypes, Deferrable } from "sequelize";
import constants from "../../lib/constants/index.js";

let LabourModel = null;

const init = async (sequelize) => {
  LabourModel = sequelize.define(
    constants.models.LABOUR_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
        validate: {
          isUUID: 4,
        },
      },
      labour_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "labour_name is required" },
        },
      },
      daily_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "daily_hours should be integer.",
          },
          notNull: {
            msg: "daily_hours is required.",
          },
        },
      },
      daily_wage: {
        type: DataTypes.FLOAT(2),
        defaultValue: 0.0,
      },
      labour_type: {
        type: DataTypes.ENUM("skilled", "unskilled", ""),
        defaultValue: "",
      },
      gender: {
        type: DataTypes.ENUM("male", "female", ""),
        defaultValue: "",
      },
      remarks: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await LabourModel.sync({ alter: true });
};

const create = async (req) => {
  return await LabourModel.create(
    {
      project_id: req.body.project_id,
      labour_name: req.body.labour_name,
      daily_hours: req.body.daily_hours,
      daily_wage: req.body.daily_wage,
      labour_type: req.body.labour_type,
      gender: req.body.gender,
      remarks: req.body.remarks,
    },
    { returning: true, raw: true }
  );
};

const update = async (req, id) => {
  const [rowCount, rows] = await LabourModel.update(
    {
      labour_name: req.body.labour_name,
      daily_hours: req.body.daily_hours,
      daily_wage: req.body.daily_wage,
      labour_type: req.body.labour_type,
      gender: req.body.gender,
      remarks: req.body.remarks,
    },
    { where: { id: req.params.id || id }, returning: true, raw: true }
  );

  return rows;
};

const getById = async (req, id) => {
  return await LabourModel.findOne({
    where: { id: req.params.id || id },
  });
};

const deleteById = async (req, id) => {
  return await LabourModel.destroy({
    where: { id: req.params.id || id },
  });
};

const get = async (req, id) => {
  return await LabourModel.findAll({
    where: { id: req.params.id || id },
  });
};

const getByProjectId = async (req, id) => {
  return await LabourModel.findAll({
    where: { project_id: req.params.id || id },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  deleteById: deleteById,
  get: get,
  getByProjectId: getByProjectId,
};
