export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        project_id: { type: "string", format: "uuid" },
        category_name: { type: "string", minLength: 1 },
      },
      required: ["project_id", "category_name"],
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
        name: { type: "string", minLength: 1 },
        abbreviation: { type: "string", minLength: 1 },
      },
      required: ["name", "abbreviation"],
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
