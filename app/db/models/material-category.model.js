"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { DataTypes, Deferrable } from "sequelize";

// ? this will go in material model as material category
let MaterialCategoryModel = null;

const init = async (sequelize) => {
  MaterialCategoryModel = sequelize.define(
    constants.models.MATERIAL_CATEGORY_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please enter category name!" },
          notEmpty: { msg: "Category name cannot be empty!" },
          len: {
            arg: [3],
            msg: "Category name must be atleast 3 character long!",
          },
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
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  await MaterialCategoryModel.sync({ alter: true });
};

const create = async (req) => {
  return await MaterialCategoryModel.create(
    {
      category_name: req.body.category_name,
      project_id: req.body.project_id,
      user_id: req.user_data.id,
    },
    {
      returning: true,
      raw: true,
    }
  );
};

const update = async (req, id) => {
  return await MaterialCategoryModel.create(
    {
      category_name: req.body.category_name,
    },
    { where: { id: req.params.id || id }, returning: true, raw: true }
  );
};

const deleteById = async (req, id) => {
  return await MaterialCategoryModel.destroy({
    where: { id: req.params.id || id },
  });
};

const getById = async (req, id) => {
  return await MaterialCategoryModel.findOne({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const getByProjectId = async (req, id) => {
  return await MaterialCategoryModel.findAll({
    where: { project_id: req.params.id || id },
  });
};

const get = async (req, id) => {
  return await MaterialCategoryModel.findAll({});
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
