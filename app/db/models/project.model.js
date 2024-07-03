"use strict";
import sequelizeFwk from "sequelize";
import constants from "../../lib/constants/index.js";

let ProjectModel = null;

const { DataTypes, Deferrable, QueryTypes } = sequelizeFwk;

const init = async (sequelize) => {
  ProjectModel = sequelize.define(
    constants.models.PROJECT_TABLE,
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "Title is required!",
          notEmpty: "Title is required!",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      organisation_id: {
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: constants.models.ORGANISATION_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      start_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      end_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await ProjectModel.sync({ alter: true });
};

const create = async (req) => {
  return await ProjectModel.create({
    project_name: req.body?.project_name,
    user_id: req.user_data?.id,
    organisation_id: req.body?.organisation_id,
  });
};

const update = async (req, id) => {
  return await ProjectModel.update(
    {
      project_name: req.body?.project_name,
      user_id: req.user_data?.id,
      organisation_id: req.body?.organisation_id,
      start_date: req.body?.start_date,
      end_date: req.body?.end_date,
    },
    {
      where: {
        id: req.params?.id || id,
      },
      returning: true,
      plain: true,
    }
  );
};

const get = async (req) => {
  let whereQuery = "";

  if (req.user_data.role === "user") {
    whereQuery = `WHERE user_id = '${req.user_data.id}'`;
  }

  let query = `
      SELECT
          *
        FROM projects
        ${whereQuery}
  `;

  return await ProjectModel.sequelize.query(query, {
    type: QueryTypes.SELECT,
    raw: true,
  });
};
const getById = async (req, id) => {
  return await ProjectModel.findOne({
    where: {
      id: req?.params?.id || id,
    },
    raw: true,
  });
};

const deleteById = async (req, id) => {
  return await ProjectModel.destroy({
    where: {
      id: req?.params?.id || id,
    },
  });
};

export default {
  init: init,
  create: create,
  get: get,
  getById: getById,
  update: update,
  deleteById: deleteById,
};
