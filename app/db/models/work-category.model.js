"use strict";
import sequelizeFwk from "sequelize";
import constants from "../../lib/constants/index.js";

// ! this will go in task of a project
let WorkCategoryModel = null;

const { DataTypes, QueryTypes, Deferrable } = sequelizeFwk;

const init = async (sequelize) => {
  WorkCategoryModel = sequelize.define(
    constants.models.WORK_CATEGORY_TABLE,
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      work_category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Work category name is required" },
          len: {
            args: [3],
            msg: "Work category name must be at least 3 characters long",
          },
        },
      },
      user_id: {
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await WorkCategoryModel.sync({ alter: true });
};

const create = async (req) => {
  console.log(req.user_data.id);
  return await WorkCategoryModel.create({
    work_category_name: req.body?.work_category_name,
    icon: req.body?.icon,
    user_id: req.user_data?.id,
  });
};

const update = async (req, id) => {
  return await WorkCategoryModel.update(
    {
      work_category_name: req.body?.work_category_name,
      icon: req.body?.icon,
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
        FROM ${constants.models.WORK_CATEGORY_TABLE}
        ${whereQuery}
  `;
  console.log(query);

  return await WorkCategoryModel.sequelize.query(query, {
    type: QueryTypes.SELECT,
    raw: true,
  });
};

const getById = async (req, id) => {
  return await WorkCategoryModel.findOne({
    where: {
      id: req?.params?.id || id,
    },
    raw: true,
  });
};

const deleteById = async (req, id) => {
  return await WorkCategoryModel.destroy({
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
