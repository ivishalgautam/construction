"use strict";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";
import sequelizeFwk from "sequelize";
const { DataTypes, Deferrable } = sequelizeFwk;

// ? this will go as a issue in a task
let TaskIssueModel = null;

const init = async (sequelize) => {
  TaskIssueModel = sequelize.define(
    constants.models.TASK_ISSUE_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaulValue: DataTypes.UUIDV4,
        unique: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Issue title is required!" },
          notEmpty: { msg: "Issue title is required!" },
          len: {
            args: [3],
            msg: "Issue title must be at least 3 characters long",
          },
        },
      },
      deadline_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: { msg: "Valid deadline date is required!" },
        },
      },
      assigned_to: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        validate: {
          isArray(value) {
            if (!Array.isArray(value)) {
              ErrorHandler({
                code: 500,
                message: "Tags must be an array!",
              });
            }
          },
        },
      },
      task_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.TASK_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await TaskIssueModel.sync({ alter: true });
};

const create = async (req) => {
  return await TaskIssueModel.create({
    title: req.body.title,
    deadline_date: req.body?.deadline_date,
    assigned_to: req.body?.assigned_to,
    tags: req.body?.tags,
    task_id: req.body.task_id,
  });
};

const update = async (req, id) => {
  return await TaskIssueModel.update(
    {
      title: req.body.title,
      deadline_date: req.body?.deadline_date,
      assigned_to: req.body?.assigned_to,
      tags: req.body?.tags,
    },
    {
      where: { id: req.params.id || id },
      returning: true,
      raw: true,
    }
  );
};

const get = async (req, id) => {
  return await TaskIssueModel.findAll({});
};

const getByTaskId = async (req, id) => {
  return await TaskIssueModel.findAll({
    where: {
      task_id: req.params.id,
    },
  });
};

const getById = async (req, id) => {
  return await TaskIssueModel.findOne({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const deleteById = async (req, id) => {
  return await TaskIssueModel.destroy({
    where: { id: req.params.id || id },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  get: get,
  getByTaskId: getByTaskId,
  getById: getById,
  deleteById: deleteById,
};
