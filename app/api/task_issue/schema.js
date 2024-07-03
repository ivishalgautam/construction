export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        title: { type: "string", minLength: 3 },
        deadline_date: { type: "string" },
        assigned_to: { type: "array", minItems: 0 },
        tags: { type: "array", minItems: 0 },
        task_id: { type: "string", format: "uuid" },
      },
      required: ["title", "task_id"],
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
        title: { type: "string", minLength: 3 },
        deadline_date: { type: "string" },
        assigned_to: { type: "array", minItems: 0 },
        tags: { type: "array", minItems: 0 },
        task_id: { type: "string", format: "uuid" },
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
