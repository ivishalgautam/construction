"use strict";
import controller from "./controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, options) {
  fastify.post("/", { schema: schema.post }, controller.create);
  fastify.get(
    "/:id",
    { schema: schema.checkParam },
    controller.getBySiteTransferId
  );
}
