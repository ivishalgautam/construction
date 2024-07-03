"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk from "sequelize";

const { DataTypes, Deferrable } = sequelizeFwk;

// ? this will go as a comment in task

let TaskCommentModel = null;

const init = async (sequelize) => {
  TaskCommentModel = sequelize.define(
    constants.models.TASK_COMMENT_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Please enter comment!" },
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
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      task_name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      task_progress: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await TaskCommentModel.sync({ alter: true });
};

const create = async (req) => {
  return await TaskCommentModel.create(
    {
      comment: req.body.comment,
      task_id: req.body.task_id,
      task_name: req.body.task_name,
      task_progress: req.body.task_progress,
    },
    {
      returning: true,
      raw: true,
    }
  );
};

const update = async (req, id) => {
  return await TaskCommentModel.update(
    {
      comment: req.body.comment,
    },
    {
      returning: true,
      raw: true,
    }
  );
};

const deleteById = async (req, id) => {
  return await TaskCommentModel.update({
    is_deleted: true,
  });
};

const getById = async (req, id) => {
  return await TaskCommentModel.findOne({
    where: {
      id: req.params.id || id,
    },
    raw: true,
  });
};

const getByTaskId = async (req, id) => {
  return await TaskCommentModel.findAll({
    where: {
      task_id: req.params.id || id,
    },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  getByTaskId: getByTaskId,
};
