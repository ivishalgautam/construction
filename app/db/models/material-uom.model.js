"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk from "sequelize";

const { DataTypes, Deferrable } = sequelizeFwk;

// ? this will go in material model as material uom (unit of measurement)
let MaterialUOMModel = null;

const init = async (sequelize) => {
  MaterialUOMModel = sequelize.define(
    constants.models.MATERIAL_UOM_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please enter measurement name!" },
          notEmpty: { msg: "Measurement name cannot be empty!" },
          len: {
            arg: [1],
            msg: "Measurement name must be atleast 1 character long!",
          },
        },
      },
      abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please enter abbreviation!" },
          notEmpty: { msg: "Abbreviation cannot be empty!" },
          len: {
            arg: [1],
            msg: "Abbreviation must be atleast 1 character long!",
          },
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
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await MaterialUOMModel.sync({ alter: true });
};

const create = async (req) => {
  return await MaterialUOMModel.create({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    user_id: req.user_data.id,
    project_id: req.body.project_id,
  });
};

const update = async (req, id) => {
  return await MaterialUOMModel.update(
    {
      name: req.body.name,
      abbreviation: req.body.abbreviation,
    },
    {
      where: { id: req.params.id || id },
    }
  );
};

const getById = async (req, id) => {
  return await MaterialUOMModel.findOne(
    {
      name: req.body.name,
      abbreviation: req.body.abbreviation,
    },
    {
      where: { id: req.params.id || id },
    }
  );
};

const deleteById = async (req, id) => {
  return await MaterialUOMModel.destroy({
    where: { id: req.params.id || id },
  });
};

const get = async (req, id) => {
  return await MaterialUOMModel.findAll({
    where: { user_id: req.user_data.id },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  deleteById: deleteById,
  get: get,
};
