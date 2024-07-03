"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk from "sequelize";

const { DataTypes, Deferrable } = sequelizeFwk;

let ProjectTeamModel = null;

const init = async (sequelize) => {
  ProjectTeamModel = sequelize.define(
    constants.models.PROJECT_TEAM_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      is_pending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please provide mobile_number!" },
        },
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please provide fullname!" },
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        onDelete: "SET NULL",
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
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
        validate: { isUUID: 4 },
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { createdAt: "created_at", updatedAt: "updated_at" }
  );

  await ProjectTeamModel.sync({ alter: true });
};

const create = async (req) => {
  return await ProjectTeamModel.create(
    {
      mobile_number: req.body.mobile_number,
      fullname: req.body.fullname,
      project_id: req.body.project_id,
    },
    {
      returning: true,
      raw: true,
    }
  );
};

const update = async (req) => {
  return await ProjectTeamModel.update(
    {
      is_admin: req.body.is_admin,
    },
    {
      returning: true,
      raw: true,
    }
  );
};

const deleteById = async (req, id) => {
  return await ProjectTeamModel.destroy({
    where: { id: req.params.id || id },
  });
};

const getById = async (req, id) => {
  return await ProjectTeamModel.findOne({
    where: { id: req.params.id || id },
    returning: true,
    raw: true,
  });
};

const getByProjectId = async (req, id) => {
  return await ProjectTeamModel.findAll({
    where: { project_id: req.params.id || id },
    returning: true,
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  getByProjectId: getByProjectId,
};
