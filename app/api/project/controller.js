"use strict";

import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";

const create = async (req, res) => {
  const record = await table.UserModel.getById(req, req.user_data.id);
  if (!record) return ErrorHandler({ code: 401, message: "unauthorized!" });

  const organisationRecord = await table.OrganisationModel.getById(
    req,
    req.body.organisation_id
  );
  if (!organisationRecord)
    return ErrorHandler({ code: 404, message: "organisation not found!" });

  const projectConfirmation = await table.ProjectModel.create(req);

  if (projectConfirmation) {
    const inviteMembers = await table.InviteModel.getByInviteBy(
      projectConfirmation.user_id
    );

    const createProjectTeam = inviteMembers.map(async (item) => {
      const newReq = {
        ...req,
        body: {
          ...item,
          project_id: projectConfirmation.id,
          is_admin: true,
        },
      };
      await table.ProjectTeamModel.create(newReq);
    });

    await Promise.all(createProjectTeam);
  }

  res.send({
    status: true,
    data: { id: projectConfirmation.id },
  });
};

const createDuplicate = async (req, res) => {
  const record = await table.UserModel.getById(req, req.user_data.id);
  if (!record) return ErrorHandler({ code: 401, message: "unauthorized!" });

  const projectRecord = await table.ProjectModel.getById(req);

  if (!projectRecord)
    return ErrorHandler({ code: 404, message: "Project not found!" });

  const newReq = {
    ...req,
    body: {
      ...req.body,
      project_name: "Copy-" + projectRecord.project_name,
      organisation_id: projectRecord.organisation_id,
    },
  };

  await table.ProjectModel.create(newReq);
  res.send({ status: true, message: "created" });
};

const update = async (req, res) => {
  const record = await table.UserModel.getById(req, req.user_data.id);
  if (!record) return ErrorHandler({ code: 401, message: "unauthorized!" });

  const organisationRecord = await table.OrganisationModel.getById(
    req,
    req.body.organisation_id
  );
  if (!organisationRecord)
    return ErrorHandler({ code: 404, message: "organisation not found!" });

  await table.ProjectModel.update(req);
  res.send({ status: true, message: "updated" });
};

const deleteById = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);
    if (!record) return ErrorHandler({ code: 401, message: "unauthorized!" });

    await table.ProjectModel.deleteById(req);
    res.send({ status: true, message: "updated" });
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);
    if (!record) return res.code(404).send({ message: "user not found!" });

    res.send({ status: true, data: await table.ProjectModel.getById(req) });
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const get = async (req, res) => {
  try {
    res.send({ status: true, data: await table.ProjectModel.get(req) });
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

export default {
  create: create,
  createDuplicate: createDuplicate,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};
