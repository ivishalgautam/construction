"use strict";

import controller from "./controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, option) {
  fastify.post("/", { schema: schema.post }, controller.create);
  fastify.put("/:id", { schema: schema.put }, controller.update);
  fastify.get(
    "/getByProjectId/:id",
    { schema: schema.checkParam },
    controller.getByProjectId
  );
  fastify.delete("/:id", { schema: schema.checkParam }, controller.deleteById);
}
