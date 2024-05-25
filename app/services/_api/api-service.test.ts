import { NetworkError, NetworkErrorCodes } from "../../classes/error";
import { ApiService } from "./api-service";

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mockUrl = "url";
const successResponse = "success";

async function mockFetch(url: string, options?: RequestInit): Promise<any> {
  if (url.startsWith("timeout")) {
    await timeout(10000);
  }
  if (url.startsWith("40")) {
    const code = url.split("/");
    return { ok: false, status: parseInt(code[0]) };
  }
  if (url.startsWith(mockUrl)) {
    await timeout(100);
    return { ok: true, status: 200, json: async () => successResponse };
  } else {
    throw new Error("Unexpected URL");
  }
}

describe("Product service: crud operations", () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  it("Should throw network error if the url doesn't response in less than 8 seconds", async () => {
    const apiService = new ApiService("timeout");
    await expect(apiService.get("")).rejects.toThrowError(
      new NetworkError(NetworkErrorCodes.TIMEOUT)
    );
  });
  it("Should handle any network error in the request", async () => {
    const apiService = new ApiService("throw");
    await expect(apiService.get("")).rejects.toBeInstanceOf(NetworkError);
  });
  it("Should handle 400, 403 and 404 as certain NetworkErrors, and any other rejection as Unknown NetworkError", async () => {
    const apiService400 = new ApiService("400");
    await expect(apiService400.get("")).rejects.toThrow(
      new NetworkError(NetworkErrorCodes.BAD_REQUEST)
    );
    const apiService403 = new ApiService("403");
    await expect(apiService403.get("")).rejects.toThrow(
      new NetworkError(NetworkErrorCodes.UNAUTORIZED)
    );
    const apiService404 = new ApiService("404");
    await expect(apiService404.get("")).rejects.toThrow(
      new NetworkError(NetworkErrorCodes.NOT_FOUND)
    );
    const apiServiceReject = new ApiService("40X");
    await expect(apiServiceReject.get("")).rejects.toThrow(
      new NetworkError(NetworkErrorCodes.UNKNOWN)
    );
  });

  it("Return a 200 status on get, put, post and delete with the correct params", async () => {
    const apiService = new ApiService(mockUrl);
    await expect(apiService.get("")).resolves.toBe(successResponse);
    await expect(apiService.post("", {})).resolves.toBe(successResponse);
    await expect(apiService.put("", {})).resolves.toBe(successResponse);
    await expect(apiService.delete("")).resolves.toBe(successResponse);
  });

  it("Should return false if an certain product id doesn't exists - false is returned by the backend if id doesn't exist", async () => {});
});
