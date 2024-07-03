"use strict";

import { DataTypes } from "sequelize";

let GrnSequenceModel = null;

const init = async (sequelize) => {
  GrnSequenceModel = sequelize.define(
    "grn_sequences",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    { createdAt: "created_at", updatedAt: "updated_at" }
  );

  await GrnSequenceModel.sync({ alter: true });
  await GrnSequenceModel.findOrCreate({
    where: { id: "grn" },
    defaults: { value: 0 },
  });
};

const update = async (value) => {
  const [rowCount, rows] = await GrnSequenceModel.update(
    {
      value: value,
    },
    { where: { id: "grn" }, returning: true, plain: true }
  );

  return rows;
};

export default { init: init, update: update };
