"use strict";
import controller from "./controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, options) {
  fastify.post("/", { schema: schema.post }, controller.create);
  fastify.put("/:id", { schema: schema.put }, controller.deleteById);
  fastify.get(
    "/getByMaterialId/:id",
    { schema: schema.checkParam },
    controller.getByMaterialId
  );
}
