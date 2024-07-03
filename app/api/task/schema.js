export const schema = {
  post: {
    body: {
      type: "object",
      required: ["task_name", "project_id", "work_category_id", "work_unit"],
      properties: {
        task_name: { type: "string", minLength: 3 },
        project_id: { type: "string", format: "uuid" },
        work_category_id: { type: "string", format: "uuid" },
        progress: { type: "number", minimum: 0 },
        photos: { type: "array", minItems: 0 },
        skilled_workers: { type: "number", minimum: 0 },
        unskilled_workers: { type: "number", minimum: 0 },
        work_unit: { type: "string", minLength: 3 },
        total_work_amount: { type: "number", minimum: 0 },
        total_work_done_amount: { type: "number", minimum: 0 },
        assigned_users: { type: "array", minItems: 0 },
        start_date: { type: "string", minLength: 3 },
        end_date: { type: "string", minLength: 3 },
        tags: { type: "array", minItems: 0 },
      },
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
        task_name: { type: "string", minLength: 3 },
        work_category_id: { type: "string", minLength: 3 },
        progress: { type: "number", minimum: 0 },
        photos: { type: "array", minItems: 0 },
        skilled_workers: { type: "number", minimum: 0 },
        unskilled_workers: { type: "number", minimum: 0 },
        work_unit: { type: "string", minLength: 3 },
        total_work_amount: { type: "number", minimum: 0 },
        total_work_done_amount: { type: "number", minimum: 0 },
        assigned_users: { type: "array", minItems: 0 },
        start_date: { type: "string", minLength: 3 },
        end_date: { type: "string", minLength: 3 },
        tags: { type: "array", minItems: 0 },
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
