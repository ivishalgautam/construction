"use strict";

import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND } = constants.http.status;

const create = async (req, res) => {
  const materialRecord = await table.MaterialModel.getById(
    req,
    req.body.material_id
  );
  if (!materialRecord)
    return ErrorHandler({ code: NOT_FOUND, message: "Material not found!" });

  const siteTransferRecord = await table.SiteTransferModel.getById(
    req,
    req.body.material_id
  );
  if (!siteTransferRecord)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Site transfer not found!",
    });

  res.send({ status: true, data: await table.IssuedItemModel.create(req) });
};

const getBySiteTransferId = async (req, res) => {
  const record = await table.SiteTransferModel.getById(req);
  if (!record)
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Site transfer not found!",
    });

  res.send({
    status: true,
    data: await table.IssuedItemModel.getBySiteTransferId(req),
  });
};

export default {
  create: create,
  getBySiteTransferId: getBySiteTransferId,
};
