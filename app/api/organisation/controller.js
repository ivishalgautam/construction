"use strict";

import table from "../../db/models.js";

const create = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);

    if (!record) return res.code(404).send({ message: "user not found!" });

    await table.OrganisationModel.create(req);
    res.send({ message: "created" });
  } catch (error) {
    console.error(error);
    res.code(500).send({ message: error.message, error });
  }
};

const update = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);

    if (!record) return res.code(404).send({ message: "user not found!" });

    await table.OrganisationModel.update(req);
    res.send({ message: "updated" });
  } catch (error) {
    console.error(error);
    res.code(500).send({ message: error.message, error });
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);

    if (!record) return res.code(404).send({ message: "user not found!" });

    res.send(await table.OrganisationModel.getById(req));
  } catch (error) {
    console.error(error);
    res.code(500).send({ message: error.message, error });
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);

    if (!record) return res.code(404).send({ message: "user not found!" });

    res.send(await table.OrganisationModel.deleteById(req));
  } catch (error) {
    console.error(error);
    res.code(500).send({ message: error.message, error });
  }
};

const get = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req, req.user_data.id);

    if (!record) return res.code(404).send({ message: "user not found!" });

    res.send(await table.OrganisationModel.get(req));
  } catch (error) {
    console.error(error);
    res.code(500).send({ message: error.message, error });
  }
};

export default {
  create: create,
  update: update,
  getById: getById,
  deleteById: deleteById,
  get: get,
};
