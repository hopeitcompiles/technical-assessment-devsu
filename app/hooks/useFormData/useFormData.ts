import { useState } from "react";
import { Schema } from "yup";
import { yupValidate } from "../../utils/yup-validation";

type KeysToStringType<T> = {
  [K in keyof T]?: string;
};
type KeysToOptional<T> = {
  [K in keyof T]?: T[K] | string;
};

type FormDataProps = {
  schema?: Schema;
  initialValues?: any;
  validateOnChange?: boolean;
  onSubmit?: (arg: any) => void;
};

export default function useFormData<T>(arg?: FormDataProps) {
  const {
    initialValues = {},
    schema,
    validateOnChange = true,
    onSubmit,
  } = arg || {};
  const [values, setValues] = useState<KeysToOptional<T>>(initialValues);
  const [errors, setErrors] = useState<KeysToStringType<T>>({});

  function handleChange<K extends keyof T>(
    key: K | K[],
    value: T[K] | string | (T[K] | string)[]
  ) {
    const newValues: KeysToOptional<T> = {};
    const _keys = Array.isArray(key) ? key : [key];
    const _values = Array.isArray(value) ? value : [value];
    _keys.forEach((e, index) => (newValues[e] = _values[index]));
    setValues({ ...values, ...newValues });
    if (schema && validateOnChange) {
      yupValidate(schema, newValues).then((e) => setErrors(e));
    }
  }

  function clearFormData() {
    setValues(initialValues);
  }

  async function handleSubmit() {
    let hasErrors = false;
    if (schema) {
      hasErrors = await yupValidate(schema, values).then((e) => {
        setErrors(e);
        return Object.values(e).length > 0;
      });
    }
    if (onSubmit && !hasErrors) {
      onSubmit(values);
    }
  }

  function handleSetError<K extends keyof T>(
    key: K | K[],
    error: string | string[]
  ) {
    const newErrors: KeysToOptional<T> = {};
    const _keys = Array.isArray(key) ? key : [key];
    const _errors = Array.isArray(error) ? error : [error];
    _keys.forEach((e, index) => (newErrors[e] = _errors[index]));
    setErrors((e) => ({ ...e, ...newErrors }));
  }

  return {
    values,
    errors,
    handleChange,
    clearFormData,
    submitFormData: handleSubmit,
    handleSetError,
  };
}
