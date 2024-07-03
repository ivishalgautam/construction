"use strict";
import constants from "../../lib/constants/index.js";
import { DataTypes, QueryTypes, Deferrable } from "sequelize";

let OtpModel = null;

const init = async (sequelize) => {
  OtpModel = sequelize.define(
    constants.models.OTP_TABLE,
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Country code should not be empty." },
          isNumeric: { msg: "Country code should be numeric value." },
          len: {
            args: [1, 5],
            msg: "Country code must be between 1 and 5 digits long",
          },
        },
      },
      mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Mobile number should not be empty." },
          isNumeric: { msg: "Mobile number should be numeric value." },
          len: {
            args: [10, 15],
            msg: "Mobile number must be between 10 and 15 digits long",
          },
        },
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await OtpModel.sync({ alter: true });
};

const create = async (req, otp) => {
  return await OtpModel.create({
    country_code: req.body.country_code,
    mobile_number: req.body.mobile_number,
    otp: otp,
  });
};

const update = async ({ mobile_number, otp }) => {
  return await OtpModel.update(
    {
      otp: otp,
    },
    {
      where: {
        mobile_number: mobile_number,
      },
      returning: true,
      raw: true,
    }
  );
};

const getByMobileNumber = async (req) => {
  return await OtpModel.findOne({
    where: {
      mobile_number: req.body.mobile_number,
    },
    order: [["created_at", "DESC"]],
    limit: 1,
    raw: true,
    plain: true,
  });
};

const deleteByMobileNumber = async (req) => {
  return await OtpModel.destroy({
    where: { mobile_number: req.body.mobile_number },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getByMobileNumber: getByMobileNumber,
  deleteByMobileNumber: deleteByMobileNumber,
};
