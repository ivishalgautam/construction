const create = {
  body: {
    type: "object",
    required: ["organisation_name"],
    properties: {
      organisation_name: { type: "string", minLength: 1 },
    },
  },
};

export default {
  create: create,
};
