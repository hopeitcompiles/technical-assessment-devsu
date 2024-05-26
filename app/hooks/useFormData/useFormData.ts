import { useState } from "react";
import { Schema } from "yup";
import { yupValidate } from "../../utils/yup-validation";

type KeysToStringType<T> = {
  [K in keyof T]?: string;
};
type KeysToOptional<T> = {
  [K in keyof T]?: T[K] | string;
};
type KeysToBoolType<T> = {
  [K in keyof T]?: boolean;
};

type FormDataProps<T> = {
  schema?: Schema;
  initialValues?: any;
  validateOnChange?: boolean;
  onSubmit?: (values: T, updatedKeys?: KeysToBoolType<T>) => void;
};

export default function useFormData<T>(arg?: FormDataProps<T>) {
  const {
    initialValues = {},
    schema,
    validateOnChange = true,
    onSubmit,
  } = arg || {};
  const [values, setValues] = useState<KeysToOptional<T>>(initialValues);
  const [modified, setModified] = useState<KeysToBoolType<T>>({});
  const [errors, setErrors] = useState<KeysToStringType<T>>({});

  function handleChange<K extends keyof T>(
    key: K | K[],
    value: T[K] | string | (T[K] | string)[]
  ) {
    const newValues: KeysToOptional<T> = { ...values };
    const _keys = Array.isArray(key) ? key : [key];
    const _values = Array.isArray(value) ? value : [value];
    const modifiedState = { ...modified };

    _keys.forEach((e, index) => {
      newValues[e] = _values[index];
      const initialValue = initialValues[e];
      if (
        JSON.stringify(newValues[e]) === JSON.stringify(initialValue) ||
        newValues[e]?.toString() === initialValue?.toString()
      ) {
        delete modifiedState[e];
      } else {
        modifiedState[e] = true;
      }
    });
    setModified(modifiedState);
    setValues(newValues);
    if (schema && validateOnChange) {
      yupValidate(schema, newValues).then((e) => setErrors(e));
    }
  }

  function clearFormData() {
    setErrors({});
    setValues(initialValues);
    setModified({});
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
      onSubmit(values as T, modified);
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
    modified,
    handleChange,
    clearFormData,
    submitFormData: handleSubmit,
    handleSetError,
  };
}
