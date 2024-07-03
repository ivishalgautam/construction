"use strict";
import { DataTypes, Deferrable } from "sequelize";
import constants from "../../lib/constants/index.js";

let LabourAttendanceModel = null;

const init = async (sequelize) => {
  LabourAttendanceModel = sequelize.define(
    constants.models.LABOUR_ATTENDANCE_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      labour_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.LABOUR_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
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
        validate: {
          isUUID: 4,
        },
      },
      attendance: {
        type: DataTypes.ENUM("present", "absent", "halfday"),
        allowNull: false,
        validate: {
          isInt: [["present", "absent", "halfday"]],
        },
      },
      working_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "working_hours should be integer!" },
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await LabourAttendanceModel.sync({ alter: true });
};

const create = async (req) => {
  return await LabourAttendanceModel.create(
    {
      labour_id: req.body.labour_id,
      project_id: req.body.project_id,
      attendance: req.body.attendance,
      working_hours: req.body.working_hours,
      date: req.body.date,
    },
    { returning: true, raw: true }
  );
};

const update = async (req) => {
  return await LabourAttendanceModel.create(
    {
      attendance: req.body.attendance,
      working_hours: req.body.working_hours,
    },
    {
      where: { id: req.params.id || id },
      returning: true,
      raw: true,
    }
  );
};

const deleteById = async (req) => {
  return await LabourAttendanceModel.destroy({
    where: { id: req.params.id || id },
  });
};

const getById = async (req) => {
  return await LabourAttendanceModel.findOne({
    where: { id: req.params.id || id },
  });
};

const getByProjectAndDate = async (req) => {
  return await LabourAttendanceModel.findAll({
    where: { project_id: req.params.id, date: req.params.date },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  getByProjectAndDate: getByProjectAndDate,
};
