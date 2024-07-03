"use strict";
import controller from "./controller.js";
import userController from "../users/controller.js";
import { schema } from "./schema.js";

export default async function routes(fastify, options) {
  fastify.post("/otp/send", { schema: schema.otpSend }, controller.sendOtp);
  fastify.post(
    "/otp/verify",
    { schema: schema.otpVerify },
    controller.verifyOtp
  );

  fastify.post("/refresh", {}, controller.verifyRefreshToken);
  fastify.post("/username", {}, userController.checkUsername);
  fastify.post("/:token", {}, userController.resetPassword);
}
