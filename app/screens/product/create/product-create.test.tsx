import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { useRoute } from "@react-navigation/native";
import { COMMON_MESSAGES } from "../../../constants/messages";
import mockedProducts from "../../../../__mocks__/data/products.json";
import ProductCreateScreen from "./product-create";
import product_service from "../../../services/product/product-service";
import { act } from "@testing-library/react-hooks";
import useFormData from "../../../hooks/useFormData/useFormData";

jest.mock("@react-navigation/native");
jest.mock("../../../services/product/product-service");
jest.mock("../../../hooks/useFormData/useFormData");

const mockUseFormData = useFormData as jest.MockedFunction<typeof useFormData>;

describe("Product form component: renders the Product information form for product registration", () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    const mockedSubmit = jest.fn(async () => {});

    mockUseFormData.mockReturnValue({
      clearFormData: jest.fn,
      errors: {},
      handleChange: jest.fn,
      handleSetError: jest.fn,
      modified: {},
      submitFormData: mockedSubmit,
      values: {},
    });
  });

  it("Renders the empty form when no product is provided", () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {},
    });
    const { getByText } = render(<ProductCreateScreen />);
    expect(getByText(COMMON_MESSAGES.RESTART_BUTTON));
  });

  it("Renders form submit sent to db", async () => {
    const product = mockedProducts[0];
    const mockedSubmit = jest.fn(async () => {});

    mockUseFormData.mockReturnValue({
      clearFormData: jest.fn,
      errors: {},
      handleChange: jest.fn,
      handleSetError: jest.fn,
      modified: { name: true },
      submitFormData: mockedSubmit,
      values: product,
    });

    (useRoute as jest.Mock).mockReturnValue({
      params: { product },
    });
    const { getByDisplayValue, getByText } = render(<ProductCreateScreen />);
    const nameInput = getByDisplayValue(product.name);
    expect(nameInput).toBeDefined();

    const sendButton = getByText(COMMON_MESSAGES.SEND_BUTTON);
    (product_service.update as jest.Mock).mockResolvedValue({});
    act(() => {
      fireEvent.press(sendButton);
    });
  });

  it("Renders empty form and changes", async () => {
    const product = mockedProducts[0];
    const mockedSubmit = jest.fn(async () => {});

    mockUseFormData.mockReturnValue({
      clearFormData: jest.fn,
      errors: {},
      handleChange: jest.fn,
      handleSetError: jest.fn,
      modified: { name: true },
      submitFormData: mockedSubmit,
      values: product,
    });

    (useRoute as jest.Mock).mockReturnValue({
      params: { product },
    });
    const { getByDisplayValue, getByText } = render(<ProductCreateScreen />);
    const nameInput = getByDisplayValue(product.name);
    expect(nameInput).toBeDefined();

    const sendButton = getByText(COMMON_MESSAGES.SEND_BUTTON);
    (product_service.update as jest.Mock).mockResolvedValue({});
    act(() => {
      fireEvent.press(sendButton);
    });
  });
});
