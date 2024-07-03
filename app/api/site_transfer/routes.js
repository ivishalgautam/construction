"use strict";

import controller from "./controller.js";

export default async function routes(fastify, options) {
  fastify.post("/", {}, controller.create);
  fastify.put("/:id", {}, controller.update);
  fastify.delete("/:id", {}, controller.deleteById);
  fastify.get("/:id", {}, controller.getById);
  fastify.get("/getByProjectId/:id", {}, controller.getByProjectId);
}
