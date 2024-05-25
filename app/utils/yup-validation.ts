import { Schema } from "yup";

export async function yupValidate(schema: Schema, values: any) {
  const response = await schema
    .validate(values, { abortEarly: false })
    .then(() => {
      return {};
    })
    .catch((error) => {
      const errors: typeof values = {};
      if (error.inner?.length > 0) {
        error.inner.forEach((err: any) => {
          let message = err.message.includes("must be a `number` type")
            ? "must be a number"
            : err.message;
          errors[err.path] = message;
        });
      }
      return errors;
    });
  return response;
}
