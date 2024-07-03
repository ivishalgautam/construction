"use strict";

import controller from "./controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, options) {
  fastify.post("/", { schema: schema.post }, controller.create);
  fastify.delete("/:id", { schema: schema.delete }, controller.deleteById);
  fastify.get(
    "/getByTaskId/:id",
    { schema: schema.getById },
    controller.getByTaskId
  );
}
