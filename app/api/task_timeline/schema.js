export const schema = {
  post: {
    body: {
      type: "object",
      required: ["task_id"],
      properties: {
        work_done: { type: "number", minimum: 0 },
        task_id: { type: "string", minLength: 3, format: "uuid" },
        progress: { type: "string", minLength: 3 },
        photos: { type: "string", minLength: 3 },
        skilled_workers: { type: "number", minimum: 0 },
        unskilled_workers: { type: "number", minimum: 0 },
        remarks: { type: "string", minLength: 3 },
      },
    },
  },
  getById: {
    params: {
      type: "object",
      properties: { id: { type: "string", format: "uuid" } },
      required: ["id"],
    },
  },
  delete: {
    params: {
      type: "object",
      properties: { id: { type: "string", format: "uuid" } },
      required: ["id"],
    },
  },
};
