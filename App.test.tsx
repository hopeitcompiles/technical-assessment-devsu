import { createNativeStackNavigator } from "@react-navigation/native-stack";
import mockedProducts from "./__mocks__/data/products.json";

import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react-native";
import useProducts from "./app/hooks/useProducts/useProducts";
import { ProductStackParamList } from "./app/navigation/product-navigator";
import { Product } from "./app/interfaces/Product";
import ProductHomeScreen from "./app/screens/product/home/product-home";
import ProductDetailScreen from "./app/screens/product/detail/product-detail";
import ProductCreateScreen from "./app/screens/product/create/product-create";
import { COMMON_MESSAGES } from "./app/constants/messages";
import product_service from "./app/services/product/product-service";
import { dateFormat } from "./app/utils/date-convertions";
import { ReactTestInstance } from "react-test-renderer";
import { BusinessError, BusinessErrorCodes } from "./app/classes/error";
import { Alert } from "react-native";

jest.mock("./app/hooks/useProducts/useProducts");
jest.mock("./app/services/product/product-service");

const alertMock = jest.spyOn(Alert, "alert");

const mockUseProductList = useProducts as jest.MockedFunction<
  typeof useProducts
>;

const Stack = createNativeStackNavigator<ProductStackParamList>();

describe("Renders product home screen and navigates to other screens", () => {
  const successUseProductReturnValues = {
    isLoading: false,
    productList: mockedProducts as any as Product[],
    searchProduct: jest.fn(),
    error: null,
    reloadProducts: jest.fn(),
  };

  const AppComponent = (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductHome" component={ProductHomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ProductCreate" component={ProductCreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  afterEach(() => {
    cleanup();
  });

  it("Renders correctly and matches snapshot", () => {
    mockUseProductList.mockReturnValue(successUseProductReturnValues);
    const { toJSON, getByText } = render(AppComponent);
    expect(toJSON()).toMatchSnapshot();
    expect(getByText(COMMON_MESSAGES.ADD_BUTTON)).toBeDefined();
  });

  it("Navigates to create product form", async () => {
    mockUseProductList.mockReturnValue(successUseProductReturnValues);
    (product_service.verifyIfExists as jest.Mock).mockRejectedValueOnce(
      new BusinessError(BusinessErrorCodes.PRODUCT_ALREADY_EXIST)
    );

    (product_service.create as jest.Mock).mockRejectedValueOnce(
      new BusinessError(BusinessErrorCodes.PRODUCT_ALREADY_EXIST)
    );
    (product_service.create as jest.Mock).mockResolvedValue({});

    const { getByText, queryByText, getByPlaceholderText, getByTestId } =
      render(AppComponent);

    const addButton = getByText(COMMON_MESSAGES.ADD_BUTTON);

    act(() => {
      fireEvent.press(addButton);
    });

    let sendButton: ReactTestInstance | null;
    await waitFor(() => {
      sendButton = queryByText(COMMON_MESSAGES.SEND_BUTTON);
      expect(sendButton).toBeDefined();
    });

    const dateInput = getByPlaceholderText(dateFormat.simple(new Date()));
    expect(dateInput).toBeDefined();

    act(() => {
      fireEvent.changeText(dateInput, "2/2/2025");
    });

    await waitFor(() => {
      expect(queryByText("2/2/2025")).toBeDefined();
    });

    const idInput = getByTestId("id");
    expect(idInput).toBeDefined();
    act(() => {
      fireEvent.changeText(idInput, "newid");
    });
    await waitFor(() => {
      expect(queryByText("newid")).toBeDefined();
    });

    const nameInput = getByTestId("name");
    expect(nameInput).toBeDefined();
    act(() => {
      fireEvent.changeText(nameInput, "new name");
    });
    await waitFor(() => {
      expect(queryByText("new name")).toBeDefined();
    });

    const descriptionInput = getByTestId("description");
    expect(descriptionInput).toBeDefined();
    act(() => {
      fireEvent.changeText(
        descriptionInput,
        "new description by test lorem ipsum dolor"
      );
    });
    await waitFor(() => {
      expect(queryByText("new description by test")).toBeDefined();
    });

    const logoInput = getByTestId("logo");
    expect(logoInput).toBeDefined();
    act(() => {
      fireEvent.changeText(logoInput, "new logo");
    });

    await waitFor(() => {
      expect(queryByText("new logo")).toBeDefined();
    });

    act(() => {
      if (sendButton) fireEvent.press(sendButton);
    });

    waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });

    act(() => {
      if (sendButton) fireEvent.press(sendButton);
    });

    waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });
    act(() => {
      if (sendButton) fireEvent.press(sendButton);
    });
  });
});
