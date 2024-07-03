export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        material_id: { type: "string", format: "uuid" },
        site_transfer_id: { type: "string", format: "uuid" },
        quantity: { type: "number", minimum: 0 },
      },
      required: ["material_id", "site_transfer_id", "quantity"],
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
