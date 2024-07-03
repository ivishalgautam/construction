export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        labour_name: { type: "string", minLength: 3 },
        daily_hours: { type: "number" },
        daily_wage: { type: "number" },
        labour_type: { type: "string", enum: ["skilled", "unskilled", ""] },
        gender: { type: "string", enum: ["male", "female", ""] },
        remarks: { type: "string", minLength: 3 },
      },
      required: ["labour_name", "daily_hours"],
    },
  },
  put: {
    params: {
      type: "object",
      properties: { id: { type: "string", format: "uuid" } },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        labour_name: { type: "string", minLength: 3 },
        daily_hours: { type: "number" },
        daily_wage: { type: "number" },
        labour_type: { type: "string", enum: ["skilled", "unskilled", ""] },
        gender: { type: "string", enum: ["male", "female", ""] },
        remarks: { type: "string", minLength: 3 },
      },
    },
  },
  checkParam: {
    params: {
      type: "object",
      properties: { id: { type: "string", format: "uuid" } },
      required: ["id"],
    },
  },
};
