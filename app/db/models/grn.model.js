"use strict";
import { DataTypes, Deferrable } from "sequelize";
import constants from "../../lib/constants/index.js";

let GrnModel = null;

const init = async (sequelize) => {
  GrnModel = sequelize.define(constants.models.GRN_TABLE, {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    grn_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: constants.models.PROJECT_TABLE,
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      validate: {
        isUUID: 4,
      },
    },
    remarks: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
  });

  GrnModel.beforeCreate(async (grn, options) => {
    const prefix = "GRN00000";

    const grnSequence = await sequelize.models.grn_sequences.findOne({
      where: { id: "grn" },
    });
    const nextValue = grnSequence.value + 1;

    await grnSequence.update({ value: nextValue });
    grn.grn_id = `${prefix}${nextValue}`;
  });

  await GrnModel.sync({ alter: true });
};

const create = async (req) => {
  return await GrnModel.create(
    {
      project_id: req.body.project_id,
      remarks: req.body.remarks,
    },
    { returning: true, raw: true }
  );
};

const update = async (req, id) => {
  const [rowCount, rows] = await GrnModel.update(
    {
      remarks: req.body.remarks,
    },
    {
      where: {
        id: req.params.id || id,
      },
      returning: true,
      plain: true,
    }
  );

  return rows;
};

const getById = async (req, id) => {
  return await GrnModel.findOne({
    where: {
      id: req.params.id || id,
    },
    raw: true,
  });
};

const deleteById = async (req, id) => {
  return await GrnModel.destroy({
    where: {
      id: req.params.id || id,
    },
  });
};

const getByProjectId = async (req, id) => {
  return await GrnModel.findAll({
    where: {
      project_id: req.params.id || id,
    },
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  deleteById: deleteById,
  getByProjectId: getByProjectId,
};
