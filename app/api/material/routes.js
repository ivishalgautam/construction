"use strict";
import controller from "./controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, options) {
  fastify.post("/", { schema: schema.post }, controller.create);
  fastify.put("/:id", { schema: schema.put }, controller.update);
  fastify.delete("/:id", { schema: schema.checkParam }, controller.deleteById);
  fastify.get("/:id", { schema: schema.checkParam }, controller.getById);
  fastify.get(
    "/getByProjectId/:id",
    { schema: schema.checkParam },
    controller.getByProjectId
  );
  fastify.get("/", {}, controller.get);
}
