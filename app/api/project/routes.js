"use strict";

import controller from "./controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, options) {
  fastify.post("/", { schema: schema.create }, controller.create);
  fastify.post(
    "/duplicate/:id",
    { schema: schema.checkParam },
    controller.createDuplicate
  );
  fastify.put("/:id", { schema: schema.checkParam }, controller.update);
  fastify.delete("/:id", { schema: schema.checkParam }, controller.deleteById);
  fastify.get("/:id", { schema: schema.checkParam }, controller.getById);
  fastify.get("/", {}, controller.get);
}
