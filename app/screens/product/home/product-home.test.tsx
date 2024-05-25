import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductStackParamList } from "../../../navigation/product-navigator";
import useProducts from "../../../hooks/useProducts/useProducts";
import mockedProducts from "../../../../__mocks__/data/products.json";
import { Product } from "../../../interfaces/Product";
import { NavigationContainer } from "@react-navigation/native";
import ProductHomeScreen from "./product-home";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { COMMON_MESSAGES, ERROR_MESSAGES } from "../../../constants/messages";
import ProductDetailScreen from "../detail/product-detail";
import product_service from "../../../services/product/product-service";

jest.mock("../../../hooks/useProducts/useProducts");
jest.mock("../../../services/product/product-service");

const mockUseProductList = useProducts as jest.MockedFunction<
  typeof useProducts
>;

const Stack = createNativeStackNavigator<ProductStackParamList>();

describe("ProductHomeScreen: renders a list of products, a button for creating a new and an a search input", () => {
  const successUseProductReturnValues = {
    isLoading: false,
    productList: mockedProducts as any as Product[],
    searchProduct: jest.fn(),
    error: null,
    reloadProducts: jest.fn(),
  };

  const HomeComponent = (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductHome" component={ProductHomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  afterEach(() => {
    cleanup();
  });

  it("Renders correctly and matches snapshot", () => {
    mockUseProductList.mockReturnValue(successUseProductReturnValues);
    const { toJSON, getByText } = render(HomeComponent);
    expect(toJSON()).toMatchSnapshot();
    expect(getByText(COMMON_MESSAGES.ADD_BUTTON)).toBeDefined();
  });

  it("Displays a list of products when not loading", async () => {
    mockUseProductList.mockReturnValue(successUseProductReturnValues);
    const { getByText } = render(HomeComponent);
    mockedProducts.forEach(async (product) => {
      expect(getByText(product.name)).toBeTruthy();
    });
  });
  it("Displays a few Skeletons while fetching the data", async () => {
    mockUseProductList.mockReturnValue({
      error: null,
      isLoading: true,
      productList: undefined,
      reloadProducts: jest.fn,
      searchProduct: jest.fn,
    });
    const { findAllByTestId } = render(HomeComponent);
    expect((await findAllByTestId("skeleton")).length).toBeGreaterThanOrEqual(
      3
    );
  });

  it("Shows an error message when fetch fails and refreshes the list when clicking the button", async () => {
    mockUseProductList.mockReturnValue({
      error: "Error",
      isLoading: false,
      productList: undefined,
      reloadProducts: jest.fn,
      searchProduct: jest.fn,
    });
    const { getByText, queryByText } = render(HomeComponent);
    expect(getByText("Error")).toBeTruthy();
    const retryButton = getByText(COMMON_MESSAGES.RETRY_BUTTON);
    mockUseProductList.mockReturnValue(successUseProductReturnValues);
    fireEvent.press(retryButton);

    await waitFor(() => {
      expect(queryByText(mockedProducts[0].name)).toBeDefined();
    });
  });

  it("Writes inot the search input and rendres the results", async () => {
    const product = mockedProducts[0];
    mockUseProductList.mockReturnValue(successUseProductReturnValues);
    const { queryByText, getByPlaceholderText } = render(HomeComponent);

    const searchInput = getByPlaceholderText(
      COMMON_MESSAGES.SEARCH_PLACEHOLDER
    );
    expect(searchInput).toBeDefined();

    fireEvent.changeText(searchInput, "string for retrieve 0 results");

    await waitFor(() => {
      expect(queryByText(ERROR_MESSAGES.NO_PRODUCTS_TO_DISPLAY)).toBeDefined();
    });

    fireEvent.changeText(searchInput, product.name);
    await waitFor(() => {
      expect(queryByText(product.id)).toBeDefined();
    });
  });

  it("Select and product, deletes it and goes back to home", async () => {
    const product = mockedProducts[0];
    mockUseProductList.mockReturnValue(successUseProductReturnValues);

    (product_service.delete as jest.Mock).mockResolvedValue(true);

    const { getByText, queryByText } = render(HomeComponent);

    await waitFor(() => {
      expect(queryByText(product.name)).toBeDefined();
    });

    const productItem = getByText(product.name);
    fireEvent.press(productItem);

    await waitFor(() => {
      expect(queryByText(COMMON_MESSAGES.DELETE_BUTTON)).toBeDefined();
    });
    const deleteButton = getByText(COMMON_MESSAGES.DELETE_BUTTON);
    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(queryByText(COMMON_MESSAGES.CONFIRM_BUTTON)).toBeDefined();
    });
    const confirmButton = getByText(COMMON_MESSAGES.CONFIRM_BUTTON);
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(queryByText(COMMON_MESSAGES.ADD_BUTTON)).toBeDefined();
    });
  });
});
