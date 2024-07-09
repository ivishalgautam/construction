export const schema = {
  create: {
    body: {
      type: "object",
      required: ["project_name", "organisation_id"],
      properties: {
        project_name: { type: "string", minLength: 1 },
        organisation_id: { type: "string", format: "uuid" },
      },
    },
  },
  checkParam: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string", format: "uuid" },
      },
    },
  },
};
