import { Rule } from "antd/es/form";

export const validatePositiveAmount: Rule = {
  validator: async (_, value) => {
    if (value < 0) {
      return Promise.reject(
        new Error("The amount of money can't be smaller than 0")
      );
    }
    return Promise.resolve();
  },
};
