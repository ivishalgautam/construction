"use strict";
import constants from "../../lib/constants/index.js";
import hash from "../../lib/encryption/index.js";
import sequelizeFwk from "sequelize";
import { Op } from "sequelize";
import moment from "moment";

let OrganisationModel = null;

const { DataTypes, Deferrable, QueryTypes } = sequelizeFwk;

const init = async (sequelize) => {
  OrganisationModel = sequelize.define(
    constants.models.ORGANISATION_TABLE,
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      organisation_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
        validate: {
          isUUID: 4,
        },
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await OrganisationModel.sync({ alter: true });
};

const create = async (req) => {
  return await OrganisationModel.create({
    organisation_name: req.body?.organisation_name,
    user_id: req.user_data?.id,
  });
};

const update = async (req, id) => {
  return await OrganisationModel.update(
    {
      organisation_name: req.body?.organisation_name,
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
        FROM organisations
        ${whereQuery}
  `;

  return await OrganisationModel.sequelize.query(query, {
    type: QueryTypes.SELECT,
    raw: true,
  });
};

const getById = async (req, id) => {
  return await OrganisationModel.findOne({
    where: {
      id: req?.params?.id || id,
    },
    raw: true,
  });
};

const deleteById = async (req, id) => {
  return await OrganisationModel.destroy({
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
