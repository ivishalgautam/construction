"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk from "sequelize";

const { DataTypes, Deferrable } = sequelizeFwk;

let MaterialModel = null;

const init = async (sequelize) => {
  MaterialModel = sequelize.define(
    constants.models.MATERIAL_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      material_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "material_name is required!" },
          notEmpty: { msg: "material_name is required!" },
          len: {
            args: [3],
            msg: "material_name must have atleast 3 charaters!",
          },
        },
      },
      specification: {
        type: DataTypes.STRING,
        defaultValue: "",
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
      uom: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "SET NULL",
        references: {
          model: constants.models.MATERIAL_UOM_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
      category: {
        type: DataTypes.UUID,
        onDelete: "SET NULL",
        references: {
          model: constants.models.MATERIAL_CATEGORY_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      item_code: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      in_stock_quantity: {
        type: DataTypes.FLOAT(2),
        defaultValue: 0.0,
      },
      min_stock_quantity: {
        type: DataTypes.FLOAT(2),
        defaultValue: 0.0,
      },
      unit_price: {
        type: DataTypes.FLOAT(2),
        defaultValue: 0.0,
      },
      hsn_code: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      brand_name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      length: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      breadth: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      diameter: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      height: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      weight: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await MaterialModel.sync({ alter: true });
};

const create = async (req) => {
  return await MaterialModel.create(
    {
      material_name: req.body.material_name,
      specification: req.body.specification,
      project_id: req.body.project_id,
      uom: req.body.uom,
      category: req.body.category,
      item_code: req.body.item_code,
      in_stock_quantity: req.body.in_stock_quantity,
      min_stock_quantity: req.body.min_stock_quantity,
      unit_price: req.body.unit_price,
      hsn_code: req.body.hsn_code,
      brand_name: req.body.brand_name,
      length: req.body.length,
      breadth: req.body.breadth,
      diameter: req.body.diameter,
      height: req.body.height,
      weight: req.body.weight,
      color: req.body.color,
    },
    { returning: true, raw: true }
  );
};

const update = async (req, id) => {
  return await MaterialModel.update(
    {
      material_name: req.body.material_name,
      specification: req.body.specification,
      uom: req.body.uom,
      category: req.body.category,
      item_code: req.body.item_code,
      in_stock_quantity: req.body.in_stock_quantity,
      min_stock_quantity: req.body.min_stock_quantity,
      unit_price: req.body.unit_price,
      hsn_code: req.body.hsn_code,
      brand_name: req.body.brand_name,
      length: req.body.length,
      breadth: req.body.breadth,
      diameter: req.body.diameter,
      height: req.body.height,
      weight: req.body.weight,
      color: req.body.color,
    },
    {
      where: { id: req.params.id || id },
      returning: true,
      raw: true,
    }
  );
};

const deleteById = async (req, id) => {
  return await MaterialModel.destroy({
    where: { id: req.params.id || id },
  });
};

const getById = async (req, id) => {
  return await MaterialModel.findOne({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const get = async (req, id) => {
  return await MaterialModel.findAll({
    where: { id: req.params.id || id },
    raw: true,
  });
};

const getByProjectId = async (req, id) => {
  return await MaterialModel.findAll({
    where: { project_id: req.params.id || id },
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
  getByProjectId: getByProjectId,
};
