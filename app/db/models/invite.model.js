"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk, { QueryTypes } from "sequelize";

const { DataTypes, Deferrable } = sequelizeFwk;

// this is invite model when user invites a member to their site
let InviteModel = null;

const init = async (sequelize) => {
  InviteModel = sequelize.define(
    constants.models.INVITES_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      invite_by: {
        type: DataTypes.UUID,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      invite_to_mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please provide mobile_number!" },
        },
      },
    },
    { createdAt: "created_at", updatedAt: "updated_at" }
  );

  await InviteModel.sync({ alter: true });
};

const create = async ({ invite_by, invite_to_mobile_number }) => {
  const data = await InviteModel.create(
    {
      invite_by: invite_by,
      invite_to_mobile_number: invite_to_mobile_number,
    },
    {
      returning: true,
      raw: true,
    }
  );

  return data.dataValues;
};

const getByInviteBy = async (id) => {
  let query = `
    SELECT
        usr.user_id,
        usr.mobile_number,
        usr.fullname
      FROM ${constants.models.INVITES_TABLE} invt
      LEFT JOIN ${constants.models.USER_TABLE} usr ON usr.mobile_number = invt.invite_to_mobile_number
      WHERE invt.invite_by = '${id}'
`;

  return await InviteModel.sequelize.query(query, {
    type: QueryTypes.SELECT,
    raw: true,
  });
};

export default {
  init: init,
  create: create,
  getByInviteBy: getByInviteBy,
};
