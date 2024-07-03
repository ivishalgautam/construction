"use strict";
import { DataTypes, Deferrable } from "sequelize";
import constants from "../../lib/constants/index.js";

let SiteTransferModel = null;

const init = async (sequelize) => {
  SiteTransferModel = sequelize.define(
    constants.models.SITE_TRANSFER_TABLE,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      st_id: {
        type: DataTypes.STRING,
        allowNull: false,
        notNull: {
          msg: "st_id is required!",
        },
      },
      sending_site: {
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
      receiving_site: {
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
      issued_by: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
      checked_by: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
        validate: {
          isUUID: 4,
        },
      },
      remark_from_issuing_site: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      status: {
        type: DataTypes.ENUM("issued", "partially_delivered", "transferred"),
        defaultValue: "issued",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await SiteTransferModel.sync({ alter: true });
};

const create = async (req) => {
  return await SiteTransferModel.create(
    {
      st_id: req.body.st_id,
      sending_site: req.body.sending_site,
      receiving_site: req.body.receiving_site,
      issued_by: req.user_data.id,
      checked_by: req.body.checked_by,
      remark_from_issuing_site: req.body.remark_from_issuing_site,
    },
    {
      returning: true,
      raw: true,
    }
  );
};

const update = async (req, id) => {
  const [rowCount, rows] = await SiteTransferModel.update(
    {
      st_id: req.body.st_id,
      sending_site: req.body.sending_site,
      receiving_site: req.body.receiving_site,
      issued_by: req.user_data.id,
      checked_by: req.body.checked_by,
      remark_from_issuing_site: req.body.remark_from_issuing_site,
      status: req.body.status,
    },
    {
      where: { is: req.params.id || id },
      returning: true,
      raw: true,
    }
  );

  return rows;
};

const getById = async (req) => {
  return await SiteTransferModel.findOne({
    where: { id: req.params.id || id },
    raw: true,
  });
};
const getBySendingSiteId = async (req) => {
  return await SiteTransferModel.findOne({
    where: { sending_site: req.params.id || id },
    raw: true,
  });
};

const getByReceivingSiteId = async (req) => {
  return await SiteTransferModel.findOne({
    where: { receiving_site: req.params.id || id },
    raw: true,
  });
};

const countBySendingSiteId = async (req) => {
  return await SiteTransferModel.findOne({
    where: { sending_site: req.params.id || id },
    attributes: [
      "id",
      SiteTransferModel.sequelize.fn(
        "COUNT",
        SiteTransferModel.sequelize.col("id"),
        "total_st"
      ),
    ],
    raw: true,
  });
};

const countByReceivingSiteId = async (req) => {
  return await SiteTransferModel.findOne({
    where: { receiving_site: req.params.id || id },
    attributes: [
      "id",
      SiteTransferModel.sequelize.fn(
        "COUNT",
        SiteTransferModel.sequelize.col("id"),
        "total_st"
      ),
    ],
    raw: true,
  });
};

const deleteById = async (req) => {
  return await SiteTransferModel.destroy({
    where: { id: req.params.id || id },
  });
};

const getByProjectId = async (req) => {
  return await SiteTransferModel.findAll({
    where: { project_id: req.params.id || id },
  });
};

export default {
  init: init,
  create: create,
  update: update,
  getById: getById,
  getBySendingSiteId: getBySendingSiteId,
  getByReceivingSiteId: getByReceivingSiteId,
  countBySendingSiteId: countBySendingSiteId,
  countByReceivingSiteId: countByReceivingSiteId,
  deleteById: deleteById,
  getByProjectId: getByProjectId,
};
