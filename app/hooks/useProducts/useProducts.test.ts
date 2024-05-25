import { renderHook, act } from "@testing-library/react-hooks";
import useProducts from "./useProducts";
import product_service from "../../services/product/product-service";
import mockedProducts from "../../../__mocks__/data/products.json";

jest.mock("../../services/product/product-service");

describe("useProducts test: retrieve and filter of product list", () => {
  beforeEach(() => {
    (product_service.getAll as jest.Mock).mockResolvedValue(mockedProducts);
  });

  it("Initial product retrieval with 3 mocked results and refresh to get 0 records", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProducts());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.productList).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.productList).toHaveLength(mockedProducts.length);

    (product_service.getAll as jest.Mock).mockResolvedValue([]);

    await act(async () => {
      result.current.reloadProducts();
      await waitForNextUpdate();
    });
    expect(result.current.productList).toHaveLength(0);
  });

  it("Filter product list with searchProduct function", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useProducts());

    await waitForNextUpdate();
    expect(result.current.productList).toHaveLength(3);

    await act(async () => {
      result.current.searchProduct(mockedProducts[0].name);
      await waitForNextUpdate();
    });

    expect(result.current.productList?.length).toBeGreaterThanOrEqual(1);
  });

  it("Fail product retrieval and set error state", async () => {
    const errorMessage = "Failed to fetch products";

    (product_service.getAll as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const { result, waitForNextUpdate } = renderHook(() => useProducts());

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.productList).toBeUndefined();
    expect(result.current.error).toBe(errorMessage);
  });
});
