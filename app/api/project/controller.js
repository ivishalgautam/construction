"use strict";

import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";

const create = async (req, res) => {
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

    console.log({ inviteMembers });

    await table.ProjectTeamModel.create({
      body: {
        mobile_number: req.user_data.mobile_number,
        fullname: req.user_data.fullname,
        project_id: projectConfirmation.id,
        is_admin: true,
      },
    });

    const createProjectTeam = inviteMembers.map((item) => ({
      ...item,
      project_id: projectConfirmation.id,
      is_admin: true,
    }));

    await table.ProjectTeamModel.bulkCreate(createProjectTeam);
  }

  res.send({
    status: true,
    data: { id: projectConfirmation.id },
  });
};

const createDuplicate = async (req, res) => {
  const projectRecord = await table.ProjectModel.getById(req);

  if (!projectRecord)
    return ErrorHandler({ code: 404, message: "Project not found!" });

  const project = Array.isArray(projectRecord)
    ? projectRecord[0]
    : projectRecord;

  const duplicateData = {
    ...project,
    project_name: `Copy-${project.project_name}`,
  };

  const newReq = {
    ...req,
    body: {
      ...req.body,
      ...duplicateData,
    },
  };

  const duplicate = await table.ProjectModel.create(newReq);

  if (duplicate) {
    const tasks = await table.TaskModel.getByProjectId(req);
    const duplicateTasks = tasks.map((item) => {
      const { id, ...rest } = item;
      return {
        ...rest,
        project_id: duplicate.id,
      };
    });

    await table.TaskModel.bulkCreate(duplicateTasks);
  }

  res.send({ status: true, message: "created" });
};

const update = async (req, res) => {
  const projectRecord = await table.ProjectModel.getById(req);
  if (!projectRecord)
    return ErrorHandler({ code: 404, message: "Project not found!" });

  await table.ProjectModel.update(req);
  res.send({ status: true, message: "updated" });
};

const deleteById = async (req, res) => {
  const projectRecord = await table.ProjectModel.getById(req);
  const project = Array.isArray(projectRecord)
    ? projectRecord[0]
    : projectRecord;

  if (!project)
    return ErrorHandler({ code: 404, message: "Project not found!" });

  await table.ProjectModel.deleteById(req);
  res.send({ status: true, message: "deleted" });
};

const getById = async (req, res) => {
  try {
    res.send({ status: true, data: await table.ProjectModel.getById(req) });
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const get = async (req, res) => {
  res.send({ status: true, data: await table.ProjectModel.get(req) });
};

export default {
  create: create,
  createDuplicate: createDuplicate,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};
