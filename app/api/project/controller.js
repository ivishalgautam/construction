"use strict";

import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";

const create = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);
    if (!record) return res.code(404).send({ message: "user not found!" });

    const organisationRecord = await table.OrganisationModel.getById(
      req,
      req.body.organisation_id
    );
    if (!organisationRecord)
      return res.code(404).send({ message: "organisation not found!" });

    await table.ProjectModel.create(req);
    res.send({ message: "created" });
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);
    if (!record) return res.code(404).send({ message: "user not found!" });

    const organisationRecord = await table.OrganisationModel.getById(
      req,
      req.body.organisation_id
    );
    if (!organisationRecord)
      return res.code(404).send({ message: "organisation not found!" });

    await table.ProjectModel.update(req);
    res.send({ message: "updated" });
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);
    if (!record) return res.code(404).send({ message: "user not found!" });

    await table.ProjectModel.deleteById(req);
    res.send({ message: "updated" });
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);
    if (!record) return res.code(404).send({ message: "user not found!" });

    res.send(await table.ProjectModel.getById(req));
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

const get = async (req, res) => {
  try {
    res.send(await table.ProjectModel.get(req));
  } catch (error) {
    ErrorHandler({ code: error.statusCode, message: error.message });
  }
};

export default {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  get: get,
};
