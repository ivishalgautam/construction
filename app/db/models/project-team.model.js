"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { QueryTypes } from "sequelize";

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
        defaultValue: true,
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
  const project = await ProjectTeamModel.create(
    {
      mobile_number: req.body.mobile_number,
      fullname: req.body.fullname,
      project_id: req.body.project_id,
      is_admin: req.body.is_admin,
    },
    {
      returning: true,
      raw: true,
    }
  );

  return project.dataValues;
};

const bulkCreate = async (data) => {
  return await ProjectTeamModel.bulkCreate(data);
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
  // id, is_pending, mobile_number, fullname, user_id, project_id, is_admin;
  let query = `
  SELECT
    json_agg(
      CASE
        WHEN usr.id IS NOT NULL THEN 
          json_build_object(
            'id', usr.id,
            'is_pending', false,
            'mobile_number', usr.mobile_number,
            'fullname', usr.fullname,
            'project_id', pt.project_id,
            'is_admin', pt.is_admin,
            'created_at', pt.created_at,
            'updated_at', pt.updated_at
          )
        ELSE 
          json_build_object(
            'id', pt.id,
            'is_pending', true,
            'mobile_number', pt.mobile_number,
            'fullname', pt.fullname,
            'project_id', pt.project_id,
            'is_admin', pt.is_admin,
            'created_at', pt.created_at,
            'updated_at', pt.updated_at
          )
      END
    ) as results
    FROM ${constants.models.PROJECT_TEAM_TABLE} pt
    LEFT JOIN ${
      constants.models.USER_TABLE
    } usr ON usr.mobile_number = pt.mobile_number
    LEFT JOIN ${constants.models.PROJECT_TABLE} prj ON prj.id = pt.project_id
    WHERE pt.project_id = '${req.params.id || id}'
  `;

  const data = await ProjectTeamModel.sequelize.query(query, {
    type: QueryTypes.SELECT,
    raw: true,
  });

  console.log({ data });

  return data[0].results;
};

export default {
  init: init,
  create: create,
  bulkCreate: bulkCreate,
  update: update,
  deleteById: deleteById,
  getById: getById,
  getByProjectId: getByProjectId,
};
