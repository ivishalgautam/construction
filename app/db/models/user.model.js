"use strict";
import constants from "../../lib/constants/index.js";
import hash from "../../lib/encryption/index.js";
import sequelizeFwk from "sequelize";
import { Op } from "sequelize";
import moment from "moment";

let UserModel = null;

const init = async (sequelize) => {
  UserModel = sequelize.define(
    constants.models.USER_TABLE,
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: sequelizeFwk.DataTypes.UUID,
        defaultValue: sequelizeFwk.DataTypes.UUIDV4,
      },
      fullname: {
        type: sequelizeFwk.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      mobile_number: {
        type: sequelizeFwk.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      country_code: {
        type: sequelizeFwk.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: sequelizeFwk.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      designation: {
        type: sequelizeFwk.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      average_project_budget_in_company: {
        type: sequelizeFwk.DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      company_type: {
        type: sequelizeFwk.DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      business_industry: {
        type: sequelizeFwk.DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      is_active: {
        type: sequelizeFwk.DataTypes.BOOLEAN,
        defaultValue: true,
      },
      role: {
        type: sequelizeFwk.DataTypes.ENUM({
          values: ["admin", "user"],
        }),
        defaultValue: "user",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await UserModel.sync({ alter: true });
};

const create = async (req) => {
  return await UserModel.create({
    mobile_number: req.body?.mobile_number,
    country_code: req.body?.country_code,
  });
};

const update = async (req, user_id) => {
  return await UserModel.update(
    {
      fullname: req.body?.fullname,
      mobile_number: req.body?.mobile_number,
      email: req.body?.email,
      designation: req.body?.designation,
      average_project_budget_in_company:
        req.body?.average_project_budget_in_company,
      company_type: req.body?.company_type,
      business_industry: req.body?.business_industry,
      is_active: req.body?.is_active,
    },
    {
      where: {
        id: req.params?.id || user_id,
      },
      returning: true,
      plain: true,
    }
  );
};

const get = async (req) => {
  const role = req.query?.role;
  return await UserModel.findAll({
    where: { role: role && role !== "admin" ? role : { [Op.ne]: "admin" } },
    order: [["created_at", "DESC"]],
  });
};

const getById = async (req, user_id) => {
  return await UserModel.findOne({
    where: {
      id: req?.params?.id || user_id,
    },
    raw: true,
    attributes: [
      "id",
      "fullname",
      "is_active",
      "role",
      "mobile_number",
      "email",
      "country_code",
    ],
  });
};

const getByMobileNumber = async (req, record = undefined) => {
  return await UserModel.findOne({
    where: {
      mobile_number: req?.body?.mobile_number || record?.user?.mobile_number,
    },
    raw: true,
    attributes: [
      "id",
      "fullname",
      "is_active",
      "role",
      "mobile_number",
      "email",
      "country_code",
    ],
  });
};

const deleteById = async (req, user_id) => {
  return await UserModel.destroy({
    where: {
      id: req?.params?.id || user_id,
    },
    returning: true,
    raw: true,
  });
};

const countUser = async (last_30_days = false) => {
  let where_query;
  if (last_30_days) {
    where_query = {
      createdAt: {
        [Op.gte]: moment()
          .subtract(30, "days")
          .format("YYYY-MM-DD HH:mm:ss.SSSZ"),
      },
    };
  }
  return await UserModel.findAll({
    where: where_query,
    attributes: [
      "role",
      [
        UserModel.sequelize.fn("COUNT", UserModel.sequelize.col("role")),
        "total",
      ],
    ],
    group: "role",
    raw: true,
  });
};

const getByEmailId = async (req) => {
  return await UserModel.findOne({
    where: {
      email: req.body.email,
    },
  });
};

const getByUserIds = async (user_ids) => {
  return await UserModel.findAll({
    where: {
      id: {
        [Op.in]: user_ids,
      },
    },
  });
};

export default {
  init: init,
  create: create,
  get: get,
  getById: getById,
  getByMobileNumber: getByMobileNumber,
  update: update,
  deleteById: deleteById,
  countUser: countUser,
  getByEmailId: getByEmailId,
  getByUserIds: getByUserIds,
};
