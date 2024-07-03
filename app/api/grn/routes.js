"use strict";

import controller from "./controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, options) {
  fastify.get(
    "/getByProjectId/:id",
    { schema: schema.checkParams },
    controller.getByProjectId
  );
}
