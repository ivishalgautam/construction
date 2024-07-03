"use strict";

import controller from "./controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, options) {
  fastify.post("/", { schema: schema.post }, controller.create);
  fastify.put("/:id", {}, controller.update);
  fastify.delete("/:id", {}, controller.deleteById);
  fastify.get("/", {}, controller.get);
  fastify.get("/:id", {}, controller.getById);
}
