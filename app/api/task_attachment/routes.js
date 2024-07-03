"use strict";
import controller from "./controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, option) {
  fastify.post("/", { schema: schema.post }, controller.create);
  fastify.get("/:id", { schema: schema.checkParam }, controller.getById);
  fastify.delete("/:id", { schema: schema.checkParam }, controller.deleteById);
  fastify.get(
    "/getByTaskId/:id",
    { schema: schema.checkParam },
    controller.getByTaskId
  );
}
