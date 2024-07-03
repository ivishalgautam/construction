export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        mobile_number: { type: "string", minLength: 10, maxLength: 15 },
        fullname: { type: "string", minLength: 1 },
        project_id: { type: "string", format: "uuid" },
      },
      required: ["mobile_number", "fullname", "project_id"],
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
        is_admin: { type: "boolean" },
      },
    },
  },
  checkParam: {
    params: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
      },
      required: ["id"],
    },
  },
};
