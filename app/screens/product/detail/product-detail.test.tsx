import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import ProductDetail from "./product-detail";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COMMON_MESSAGES } from "../../../constants/messages";
import mockedProducts from "../../../../__mocks__/data/products.json";
import { ReactTestInstance } from "react-test-renderer";

jest.mock("@react-navigation/native");
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

describe("Product detail component: renders the Product information and button for delete", () => {
  afterEach(() => {
    cleanup();
  });

  it("Renders the back button when no product is available to display", () => {
    const addListenerMock = jest.fn();
    const navigateMock = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
      addListener: addListenerMock,
    });
    (useRoute as jest.Mock).mockReturnValue({
      params: {},
    });
    const { getByText } = render(<ProductDetail />);
    expect(getByText(COMMON_MESSAGES.BACK_BUTTON)).toBeDefined();
  });

  it("Renders the product information with the product objet available", () => {
    const addListenerMock = jest.fn();
    const navigateMock = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
      addListener: addListenerMock,
    });
    const product = mockedProducts[0];
    (useRoute as jest.Mock).mockReturnValue({
      params: { product },
    });
    const { getByText } = render(<ProductDetail />);
    expect(getByText(product.name));
  });
  it("Renders the product information and opens the delete modal", async () => {
    const addListenerMock = jest.fn();
    const navigateMock = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
      addListener: addListenerMock,
    });
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
    const addListenerMock = jest.fn();
    const navigateMock = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
      addListener: addListenerMock,
    });

    const product = mockedProducts[0];
    (useRoute as jest.Mock).mockReturnValue({
      params: { product },
    });

    const { getByText } = render(<ProductDetail />);
    const editButton = getByText(COMMON_MESSAGES.EDIT_BUTTON);

    fireEvent.press(editButton);
  });

  it("Listener is called at least once", async () => {
    const addListenerMock = jest.fn();
    const navigateMock = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
      addListener: addListenerMock,
    });

    const product = mockedProducts[0];
    (useRoute as jest.Mock).mockReturnValue({
      params: { product },
    });

    const { queryByText } = render(<ProductDetail />);

    await waitFor(() => {
      expect(queryByText(product.name)).toBeDefined();
    });
    expect(addListenerMock).toHaveBeenCalled();
  });
});
