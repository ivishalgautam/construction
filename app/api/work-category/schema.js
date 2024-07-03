export const schema = {
  post: {
    body: {
      type: "object",
      required: ["work_category_name"],
      properties: {
        work_category_name: { type: "string", minLength: 3 },
        icon: { type: "string", minLength: 3 },
      },
    },
  },
};
