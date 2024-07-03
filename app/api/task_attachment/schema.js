export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        file: { type: "string", minLength: 3 },
        task_id: { type: "string", format: "uuid" },
      },
      required: ["file", "task_id"],
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
