"use strict";
import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND } = constants.http.status;

const create = async (req, res) => {
  const sendingSiteRecord = await table.ProjectModel.getById(
    req,
    req.body.sending_site
  );
  if (!sendingSiteRecord)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Sending site not found!",
    });

  const receivingSiteRecord = await table.ProjectModel.getById(
    req,
    req.body.receiving_site
  );
  if (!receivingSiteRecord)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Receiving site not found!",
    });

  const checkedByRecord = await table.UserModel.getById(
    req,
    req.body.checked_by
  );
  if (!checkedByRecord)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Checked by user not found!",
    });

  const count = await table.SiteTransferModel.countBySendingSiteId({
    params: { id: req.body.sending_site },
  });

  console.log({ count });

  req.body.st_id = `00000${count.total_st + 1}`; // it should be dynamic

  const siteTransfer = await table.SiteTransferModel.create(req);

  if (siteTransfer) {
    const issuedItems = req.body.items.map(async (item) => {
      const newReq = {
        ...req,
        body: { ...req.body, ...item, site_transfer_id: siteTransfer.id },
      };
      await table.IssuedItemModel.create(newReq);
    });

    await Promise.all(issuedItems);
  }

  res.send(siteTransfer);
};

const update = async (req, res) => {
  const record = await table.SiteTransferModel.getById(req);
  if (!record)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Site transfer not found!",
    });

  res.send(await table.SiteTransferModel.update(req));
};

const deleteById = async (req, res) => {
  const record = await table.SiteTransferModel.getById(req);
  if (!record)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Site transfer not found!",
    });

  res.send(await table.SiteTransferModel.deleteById(req));
};

const getById = async (req, res) => {
  const record = await table.SiteTransferModel.getById(req);
  if (!record)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Site transfer not found!",
    });

  res.send(record);
};

const getByProjectId = async (req, res) => {
  const record = await table.ProjectModel.getById(req);
  if (!record)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Project not found!",
    });

  res.send(await table.SiteTransferModel.getByProjectId(req));
};

export default {
  create: create,
  update: update,
  deleteById: deleteById,
  getById: getById,
  getByProjectId: getByProjectId,
};
