const create = {
  body: {
    type: "object",
    required: ["project_name", "organisation_id"],
    properties: {
      project_name: { type: "string", minLength: 1 },
      organisation_id: { type: "string", format: "uuid" },
    },
  },
};

export default {
  create: create,
};
