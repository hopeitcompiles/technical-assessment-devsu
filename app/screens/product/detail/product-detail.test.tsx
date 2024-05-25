import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import ProductDetail from "./product-detail";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COMMON_MESSAGES, ERROR_MESSAGES } from "../../../constants/messages";
import mockedProducts from "../../../../__mocks__/data/products.json";
import { ReactTestInstance } from "react-test-renderer";

jest.mock("@react-navigation/native");

describe("Product detail component: renders the Product information and button for delete", () => {
  afterEach(() => {
    cleanup();
  });

  it("Renders the back button when no product is available to display", () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {},
    });
    const { getByText } = render(<ProductDetail />);
    expect(getByText(COMMON_MESSAGES.BACK_BUTTON));
  });

  it("Renders the product information with the product objet available", () => {
    const product = mockedProducts[0];
    (useRoute as jest.Mock).mockReturnValue({
      params: { product },
    });
    const { getByText } = render(<ProductDetail />);
    expect(getByText(product.name));
  });
  it("Renders the product information and opens the delete modal", async () => {
    const product = mockedProducts[0];
    (useRoute as jest.Mock).mockReturnValue({
      params: { product },
    });
    const { getByText, queryByText } = render(<ProductDetail />);
    const deleteButton = getByText(COMMON_MESSAGES.DELETE_BUTTON);

    fireEvent.press(deleteButton);

    let confirmButton;
    await waitFor(() => {
      confirmButton = queryByText(COMMON_MESSAGES.CONFIRM_BUTTON);
    });
    expect(confirmButton).toBeDefined();
    fireEvent.press(confirmButton as any as ReactTestInstance);
  });

  it("Renders the product information and press the edit button", async () => {
    const product = mockedProducts[0];
    (useRoute as jest.Mock).mockReturnValue({
      params: { product },
    });
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: jest.fn,
    });

    const { getByText } = render(<ProductDetail />);
    const editButton = getByText(COMMON_MESSAGES.EDIT_BUTTON);

    fireEvent.press(editButton);
  });
});
