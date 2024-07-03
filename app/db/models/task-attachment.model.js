"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk from "sequelize";

const { DataTypes, Deferrable } = sequelizeFwk;

let TaskAttachmentModel = null;

const init = async (sequelize) => {
  TaskAttachmentModel = sequelize.define(
    constants.models.TASK_ATTACHMENT_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      file: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await TaskAttachmentModel.sync({ alter: true });
};

const create = async (req) => {
  return await TaskAttachmentModel.create(
    {
      file: req.body.file,
      task_id: req.body.task_id,
    },
    {
      returning: true,
      raw: true,
    }
  );
};

const getById = async (req) => {
  return await TaskAttachmentModel.findOne({
    where: {
      id: req.params.id,
    },
    raw: true,
  });
};

const deleteById = async (req) => {
  return await TaskAttachmentModel.destroy({
    where: {
      id: req.params.id,
    },
    raw: true,
  });
};

const getByTaskId = async (req) => {
  return await TaskAttachmentModel.findAll({
    where: {
      task_id: req.params.id,
    },
  });
};

export default {
  init: init,
  create: create,
  getById: getById,
  deleteById: deleteById,
  getByTaskId: getByTaskId,
};
