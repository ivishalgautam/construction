export const schema = {
  signup: {
    body: {
      type: "object",
      properties: {
        mobile_number: { type: "string" },
        country_code: { type: "string" },
      },
      required: ["mobile_number", "country_code"],
    },
  },
  otpSend: {
    body: {
      type: "object",
      properties: {
        mobile_number: { type: "string" },
        country_code: { type: "string" },
      },
      required: ["mobile_number", "country_code"],
    },
  },
  otpVerify: {
    body: {
      type: "object",
      properties: {
        mobile_number: { type: "string" },
        otp: { type: "string", minLength: 6, maxLength: 6 },
      },
      required: ["mobile_number", "otp"],
    },
  },
};
