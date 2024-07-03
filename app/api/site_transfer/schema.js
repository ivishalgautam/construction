export const schema = {
  post: {
    body: "object",
    properties: {
      sending_site: { type: "string", format: "uuid" },
      receiving_site: { type: "string", format: "uuid" },
      checked_by: { type: "string", format: "uuid" },
      remark_from_issuing_site: { type: "string", minLength: 1 },
    },
    required: ["sending_site", "receiving_site", "checked_by"],
  },
};
