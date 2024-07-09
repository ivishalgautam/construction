"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND } = constants.http.status;

const create = async (req, res) => {
  const record = await table.ProjectModel.getById(req, req.body.project_id);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Project not found!" });

  const newMember = await table.ProjectTeamModel.create(req);

  if (newMember) {
    await table.InviteModel.create({
      invite_by: req.user_data.id,
      invite_to_mobile_number: newMember.mobile_number,
    });
  }

  res.send({ status: true, data: newMember });
};

const update = async (req, res) => {
  const record = await table.ProjectTeamModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Team member not found!" });
};

const getByProjectId = async (req, res) => {
  const record = await table.ProjectModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Project not found!" });

  res.send({
    status: true,
    data: await table.ProjectTeamModel.getByProjectId(req),
  });
};

const deleteById = async (req, res) => {
  const record = await table.ProjectTeamModel.getById(req);
  if (!record)
    return ErrorHandler({ code: NOT_FOUND, message: "Team member not found!" });

  res.send({
    status: true,
    data: await table.ProjectTeamModel.deleteById(req),
  });
};

export default {
  create: create,
  update: update,
  getByProjectId: getByProjectId,
  deleteById: deleteById,
};
