export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        labour_id: { type: "string", format: "uuid" },
        project_id: { type: "string", format: "uuid" },
        attendance: { type: "string", enum: ["present", "absent", "halfday"] },
        working_hours: { type: "number", minimum: 1 },
        date: { type: "string", minLength: 1 },
      },
      required: [
        "labour_id",
        "project_id",
        "attendance",
        "working_hours",
        "date",
      ],
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
        labour_id: { type: "string", format: "uuid" },
        project_id: { type: "string", format: "uuid" },
        attendance: { type: "string", enum: ["present", "absent", "halfday"] },
        working_hours: { type: "number", minimum: 1 },
        date: { type: "string", minLength: 1 },
      },
    },
  },
  getById: {
    params: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
      },
      required: ["id"],
    },
  },
  getByProjectAndDate: {
    params: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        date: { type: "string", minLength: 1 },
      },
      required: ["id", "date"],
    },
  },
};
