"use strict";

import table from "../../db/models.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import constants from "../../lib/constants/index.js";

const { NOT_FOUND, NOT_ALLOWED } = constants.http.status;

const create = async (req, res) => {
  const siteTransferRecord = await table.SiteTransferModel.getById(
    req,
    req.body.site_transfer_id
  );

  if (!siteTransferRecord) {
    return ErrorHandler({
      code: NOT_FOUND,
      message: "Site transfer not found!",
    });
  }

  if (siteTransferRecord.status === "transferred") {
    return ErrorHandler({
      code: NOT_ALLOWED,
      message: "Site transfer is completed!",
    });
  }

  const receivedItems = req.body.items.map(async (item) => {
    const materialRecord = await table.MaterialModel.getById(
      req,
      req.body.material_id
    );

    if (!materialRecord) {
      return ErrorHandler({
        code: NOT_FOUND,
        message: "Material not found!",
      });
    }

    const issuedItem = await table.IssuedItemModel.getById(
      req,
      req.body.issued_item_id
    );

    if (!issuedItem) {
      return ErrorHandler({
        code: NOT_FOUND,
        message: "Issued item not found!",
      });
    }

    const grn = await table.GrnModel.create(req);
    const newReq = {
      ...req,
      body: { ...req.body, ...item, grn_id: grn.id },
    };
    const receivedItemConfirmation = await table.ReceivedItemModel.create(
      newReq
    );
    if (receivedItemConfirmation) {
      const updateConfirmation = await table.IssuedItemModel.update({
        body: {
          pending_quantity:
            Number(issuedItem.pending_quantity) -
            Number(receivedItemConfirmation.received_quantity),
        },
        params: { id: newReq.body.issued_item_id },
      });

      if (updateConfirmation && siteTransferRecord.status === "issued") {
        await table.SiteTransferModel.update({
          ...req,
          body: { status: "partially_delivered" },
          params: { id: siteTransferRecord.id },
        });
      }
    }
  });

  await Promise.all(receivedItems).catch((error) => {
    return ErrorHandler({ message: error.message });
  });

  res.send({ message: "Items added." });
};

const update = async (req, res) => {
  const updateReceivedItems = req.body.items.map(async (item) => {
    const record = await table.ReceivedItemModel.getById(req);
    if (!record) return;

    const newReq = {
      ...req,
      body: { ...req.body, ...item },
      params: { id: item.id },
    };

    await table.ReceivedItemModel.update(newReq);
  });

  await Promise.all(updateReceivedItems)
    .then(async (data) => {
      const { total } =
        await table.ReceivedItemModel.countTotalQtyBySiteTransferId(
          record.site_transfer_id
        );

      await table.ReceivedItemModel.update({
        body: { pending_quantity: total },
        params: { id: record.issued_item_id },
      });
    })
    .catch((error) => ErrorHandler({ message: error.message }));

  res.send({ message: "Updated" });
};

export default {
  create: create,
  update: update,
};
