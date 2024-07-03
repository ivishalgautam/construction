export const schema = {
  post: {
    body: {
      type: "object",
      properties: {
        transaction_amount: { type: "number", minimum: 0 },
        transaction_type: { type: "string", enum: ["added", "used"] },
        material_id: { type: "string", format: "uuid" },
      },
      required: ["transaction_amount", "transaction_type", "material_id"],
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
        reason: { type: "string" },
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
