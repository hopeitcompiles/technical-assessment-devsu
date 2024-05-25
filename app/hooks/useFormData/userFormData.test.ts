import { renderHook, act } from "@testing-library/react-hooks";
import product_service from "../../services/product/product-service";
import mockedProducts from "../../../__mocks__/data/products.json";
import useFormData from "./useFormData";
import * as yup from "yup";

const invalidTypeErrorMessage = "Must be a number";
const mustBePositiveErrorMessage = "Age must be positive";

const mockSchema = yup.object().shape({
  age: yup
    .number()
    .typeError(invalidTypeErrorMessage)
    .positive(mustBePositiveErrorMessage),
});

jest.mock("../../services/product/product-service");

describe("useFormData", () => {
  beforeEach(() => {
    (product_service.getAll as jest.Mock).mockResolvedValue(mockedProducts);
  });

  it("Set up with valid form key value change", async () => {
    const initialValues = { age: 0 };
    const { result, waitForNextUpdate } = renderHook(() =>
      useFormData<typeof initialValues>({
        initialValues,
        schema: mockSchema,
        validateOnChange: true,
      })
    );
    expect(result.current.errors).toBeDefined();
    expect(result.current.values.age).toBe(initialValues.age);

    const newValue = 2;
    await act(async () => {
      result.current.handleChange("age", newValue);
      await waitForNextUpdate();
    });
    expect(result.current.values.age).toBe(newValue);
    expect(result.current.errors.age).toBeUndefined();
  });

  it("Set up with invalid form key value change", async () => {
    const initialValues = { age: 0 };
    const { result, waitForNextUpdate } = renderHook(() =>
      useFormData<typeof initialValues>({
        initialValues,
        schema: mockSchema,
        validateOnChange: true,
      })
    );
    expect(result.current.errors).toBeDefined();
    expect(result.current.values.age).toBe(initialValues.age);

    let newValue: number | string = -2;
    await act(async () => {
      result.current.handleChange("age", newValue);
      await waitForNextUpdate();
    });
    expect(result.current.values.age).toBe(newValue);
    expect(result.current.errors.age).toBe(mustBePositiveErrorMessage);

    newValue = "";
    await act(async () => {
      result.current.handleChange("age", newValue);
      await waitForNextUpdate();
    });
    expect(result.current.errors.age).toBe(invalidTypeErrorMessage);
  });

  it("Set custom error message", async () => {
    const initialValues = { age: 0 };
    const { result, waitForNextUpdate } = renderHook(() =>
      useFormData<typeof initialValues>({
        initialValues,
      })
    );
    const errorMessage = "Test error";
    await act(async () => {
      result.current.handleSetError("age", errorMessage);
      await waitForNextUpdate();
    });
    expect(result.current.errors.age).toBe(errorMessage);
  });

  it("Submit values with error", async () => {
    const initialValues = { age: -1 };
    const { result, waitForNextUpdate } = renderHook(() =>
      useFormData<typeof initialValues>({
        initialValues,
        schema: mockSchema,
      })
    );
    await act(async () => {
      result.current.submitFormData();
      await waitForNextUpdate();
    });
    expect(result.current.errors.age).toBe(mustBePositiveErrorMessage);
  });

  it("Submit values without errors", async () => {
    const initialValues = { age: 10 };
    let receivedSubmitValue = 0;

    const { result, waitForNextUpdate } = renderHook(() =>
      useFormData<typeof initialValues>({
        initialValues,
        schema: mockSchema,
        onSubmit: (e: typeof initialValues) => {
          receivedSubmitValue = e.age;
        },
      })
    );

    await act(async () => {
      result.current.submitFormData();
      await waitForNextUpdate();
    });
    expect(result.current.errors.age).toBeUndefined();
    expect(receivedSubmitValue).toBe(initialValues.age);
  });

  it("Change value and reset to initial one", async () => {
    const initialValues = { age: 10 };

    const { result, waitForNextUpdate } = renderHook(() =>
      useFormData<typeof initialValues>({
        initialValues,
      })
    );

    const newValue = 2;
    await act(async () => {
      result.current.handleChange("age", newValue);
      await waitForNextUpdate();
    });
    expect(result.current.values.age).toBe(newValue);

    await act(async () => {
      result.current.clearFormData();
      await waitForNextUpdate();
    });
    expect(result.current.values.age).toBe(initialValues.age);
  });
});
