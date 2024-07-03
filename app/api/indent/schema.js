export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        project_id: { type: "string", format: "uuid" },
        assigned_to: { type: "array" },
        expected_delivery_date: { type: "date" },
        remark: { type: "string" },
        items: { type: "array" },
      },
      required: ["project_id"],
    },
  },
  put: {
    params: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
      },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        project_id: { type: "string", format: "uuid" },
        assigned_to: { type: "array" },
        expected_delivery_date: { type: "date" },
        remark: { type: "string" },
        items: { type: "array" },
        status: { type: "string", enum: ["requested", "received"] },
      },
      required: ["project_id"],
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
