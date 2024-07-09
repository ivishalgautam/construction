"use strict";

import table from "../../db/models.js";
import authToken from "../../helpers/auth.js";
import crypto from "crypto";
import { sendTextOtp } from "../../helpers/interaktApi.js";
import { ErrorHandler } from "../../helpers/handleError.js";
import moment from "moment";

const sendOtp = async (req, res) => {
  const otp = crypto.randomInt(100000, 999999);

  await table.OtpModel.create(req, otp);
  // await sendOtp({ name: user?.name, phone: user.phone, otp });
  console.log({ otp });
  res.send({ status: true, message: "Otp sent", otp });
};

const verifyOtp = async (req, res) => {
  console.log(req.body);
  let userData;
  const record = await table.OtpModel.getByMobileNumber(req);

  if (!record) {
    return ErrorHandler({ code: 400, message: "OTP not found!" });
  }

  const isExpired = moment(record.created_at).add(5, "minutes").isBefore();
  if (isExpired) {
    await table.OtpModel.deleteByMobileNumber(req);
    return ErrorHandler({ code: 400, message: "Please resend OTP!" });
  }

  if (record.otp != req.body.otp) {
    return ErrorHandler({ code: 400, message: "Incorrect otp!" });
  }

  await table.OtpModel.deleteByMobileNumber(req);

  req.body.country_code = record.country_code;
  userData = await table.UserModel.getByMobileNumber(req);

  if (!userData) {
    userData = await table.UserModel.create(req);

    const [jwtToken, expiresIn] = authToken.generateAccessToken(userData);
    const refreshToken = authToken.generateRefreshToken(userData);

    return res.send({
      status: true,
      user_exist: false,
      token: jwtToken,
      expire_time: Date.now() + expiresIn,
      // refresh_token: refreshToken,
      user_data: userData,
    });
  }

  const [jwtToken, expiresIn] = authToken.generateAccessToken(userData);
  const refreshToken = authToken.generateRefreshToken(userData);

  res.send({
    status: true,
    user_exist: true,
    token: jwtToken,
    expire_time: Date.now() + expiresIn,
    // refresh_token: refreshToken,
    user_data: userData,
  });
};

const verifyRefreshToken = async (req, res) => {
  // console.log({ cookies: req.cookies });
  return authToken.verifyRefreshToken(req, res);
};

export default {
  sendOtp: sendOtp,
  verifyOtp: verifyOtp,
  verifyRefreshToken: verifyRefreshToken,
};
