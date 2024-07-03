export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        comment: { type: "string", minLength: 1 },
        task_id: { type: "string", format: "uuid" },
        task_name: { type: "string", minLength: 1 },
        task_progress: { type: "number", minimum: 0 },
      },
      required: ["comment", "task_id"],
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
        comment: { type: "string", minLength: 1 },
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
