"use strict";

import table from "../../db/models.js";

const create = async (req, res) => {
  await table.OrganisationModel.create(req);
  res.send({ status: true, message: "created" });
};

const update = async (req, res) => {
  await table.OrganisationModel.update(req);
  res.send({ status: true, message: "updated" });
};

const getById = async (req, res) => {
  res.send({
    status: true,
    data: await table.OrganisationModel.getById(req),
  });
};

const deleteById = async (req, res) => {
  res.send({
    status: true,
    data: await table.OrganisationModel.deleteById(req),
  });
};

const get = async (req, res) => {
  res.send(await table.OrganisationModel.get(req));
};

export default {
  create: create,
  update: update,
  getById: getById,
  deleteById: deleteById,
  get: get,
};
