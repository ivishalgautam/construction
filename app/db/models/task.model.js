"use strict";
import sequelize from "sequelize";
import contants from "../../lib/constants/index.js";

// ? this will go as a task in project
let TaskModel = null;

const { DataTypes, Deferrable } = sequelize;

const init = async (sequelize) => {
  TaskModel = sequelize.define(
    contants.models.TASK_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      task_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "task name is required" },
          len: {
            args: [3],
            msg: "task name must be at least 3 characters long",
          },
        },
      },
      project_id: {
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: contants.models.PROJECT_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          notNull: { msg: "project id is required" },
        },
      },
      work_category_id: {
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: contants.models.WORK_CATEGORY_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          notNull: { msg: "work category id is required" },
        },
      },
      progress: {
        type: DataTypes.FLOAT(2),
        defaultValue: 0,
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      work_unit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "work unit is required" },
        },
      },
      total_work_amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        validate: {
          isFloat: true,
        },
      },
      total_work_done_amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        validate: {
          isFloat: true,
        },
      },
      assigned_users: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      status: {
        type: DataTypes.ENUM(
          "not_started",
          "in_progress",
          "delayed",
          "completed",
          ""
        ),
        defaultValue: "",
      },
      instruction: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await TaskModel.sync({ alter: true });
};

const create = async (req) => {
  return await TaskModel.create({
    task_name: req.body?.task_name,
    project_id: req.body?.project_id,
    work_category_id: req.body?.work_category_id,
    progress: req.body?.progress,
    photos: req.body?.photos,
    work_unit: req.body?.work_unit,
    total_work_amount: req.body?.total_work_amount,
    total_work_done_amount: req.body?.total_work_done_amount,
    assigned_users: req.body?.assigned_users,
    start_date: req.body?.start_date,
    end_date: req.body?.end_date,
    tags: req.body?.tags,
    status: req.body?.status,
  });
};

const update = async (req, id) => {
  const [rowCount, rows] = await TaskModel.update(
    {
      task_name: req.body?.task_name,
      project_id: req.body?.project_id,
      work_category_id: req.body?.work_category_id,
      progress: req.body?.progress,
      photos: req.body?.photos,
      work_unit: req.body?.work_unit,
      total_work_amount: req.body?.total_work_amount,
      total_work_done_amount: req.body?.total_work_done_amount,
      assigned_users: req.body?.assigned_users,
      start_date: req.body?.start_date,
      end_date: req.body?.end_date,
      tags: req.body?.tags,
      status: req.body?.status,
      instruction: req.body?.instruction,
    },
    {
      where: { id: req.params.id || id },
      returning: true,
    }
  );
  return rows;
};

const deleteById = async (req, id) => {
  return await TaskModel.destroy({
    where: { id: req.params.id || id },
  });
};

const getById = async (req, id) => {
  return await TaskModel.findOne({
    where: { id: req?.params?.id || id },
    raw: true,
  });
};

const getByProjectId = async (req, id) => {
  return await TaskModel.findAll({
    where: { project_id: req.params.id || id },
    raw: true,
  });
};

const get = async (req) => {
  return await TaskModel.findAll({});
};

export default {
  init: init,
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  getByProjectId: getByProjectId,
  get: get,
};
