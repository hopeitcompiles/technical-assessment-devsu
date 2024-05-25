import { BusinessError, BusinessErrorCodes } from "../../classes/error";
import api_service from "../_api/api-service";
import product_service from "./product-service";
import mockedProducts from "../../../__mocks__/data/products.json";

jest.mock("../_api/api-service");

describe("Product service: crud operations", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should throw business error if an certain product id already exists", async () => {
    const mockedResponse = {};
    (api_service.get as jest.Mock).mockResolvedValueOnce(mockedResponse);

    const existingProductId = "existingProductId";
    await expect(
      product_service.verifyIfExists(existingProductId)
    ).rejects.toThrowError(
      new BusinessError(BusinessErrorCodes.PRODUCT_ALREADY_EXIST)
    );
  });

  it("Should return false if an certain product id doesn't exists - false is returned by the backend if id doesn't exist", async () => {
    const existingProductId = "existingProductId";
    (api_service.get as jest.Mock).mockResolvedValueOnce(false);
    await expect(
      product_service.verifyIfExists(existingProductId)
    ).resolves.toBe(false);
  });

  it("Return a list of Products", async () => {
    (api_service.get as jest.Mock).mockResolvedValueOnce({
      data: mockedProducts,
    });
    const results = await product_service.getAll();
    expect(results.length).toBe(mockedProducts.length);
  });

  it("Update a product", async () => {
    const mockedResponse = { data: true };
    (api_service.put as jest.Mock).mockResolvedValueOnce(mockedResponse);
    await expect(
      product_service.update(mockedProducts[0] as any)
    ).resolves.toBeTruthy();
  });
  it("Delete a product", async () => {
    const mockedResponse = { data: true };
    (api_service.delete as jest.Mock).mockResolvedValueOnce(mockedResponse);
    await expect(
      product_service.delete(mockedProducts[0].id)
    ).resolves.toBeTruthy();
  });
  it("Creates a product", async () => {
    const mockedResponse = { data: true };
    (api_service.post as jest.Mock).mockResolvedValueOnce(mockedResponse);
    await expect(
      product_service.create(mockedProducts[0] as any)
    ).resolves.toBeTruthy();
  });
});
