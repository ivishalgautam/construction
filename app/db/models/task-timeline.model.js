"use strict";
import sequelize from "sequelize";
import contants from "../../lib/constants/index.js";

// ! this will go as a timeline in task
let TaskTimelineModel = null;

const { DataTypes, Deferrable } = sequelize;

const init = async (sequelize) => {
  TaskTimelineModel = sequelize.define(
    contants.models.TASK_TIMELINE_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      work_done: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        validate: {
          isFloat: true,
        },
      },
      task_id: {
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: contants.models.TASK_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          notNull: { msg: "task id is required" },
          isUUID: 4,
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
      skilled_workers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      unskilled_workers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      remarks: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      created_by: {
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: contants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          notNull: { msg: "created by is required" },
        },
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await TaskTimelineModel.sync({ alter: true });
};

const create = async (req) => {
  return await TaskTimelineModel.create({
    work_done: req.body?.work_done,
    task_id: req.body?.task_id,
    progress: req.body?.progress,
    photos: req.body?.photos,
    skilled_workers: req.body?.skilled_workers,
    unskilled_workers: req.body?.unskilled_workers,
    remarks: req.body?.remarks,
    created_by: req.user_data?.id,
  });
};

const update = async (req, id) => {
  return await TaskTimelineModel.update(
    {
      work_done: req.body?.work_done,
      task_id: req.body?.task_id,
      progress: req.body?.progress,
      photos: req.body?.photos,
      skilled_workers: req.body?.skilled_workers,
      unskilled_workers: req.body?.unskilled_workers,
      remarks: req.body?.remarks,
    },
    {
      where: { id: req.params.id || id },
      returning: true,
      raw: true,
    }
  );
};

const deleteById = async (req, id) => {
  return await TaskTimelineModel.destroy({
    where: { id: req.params.id || id },
  });
};

const getById = async (req, id) => {
  return await TaskTimelineModel.findOne({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const getByTaskId = async (req, task_id) => {
  return await TaskTimelineModel.findAll({
    where: { task_id: req.params.id || task_id },
    raw: true,
  });
};

const get = async (req) => {
  return await TaskTimelineModel.findAll({});
};

export default {
  init: init,
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  getByTaskId: getByTaskId,
  get: get,
};
