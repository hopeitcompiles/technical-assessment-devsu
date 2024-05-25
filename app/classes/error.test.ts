import {
  BusinessError,
  BusinessErrorCodes,
  CustomError,
  NetworkError,
  NetworkErrorCodes,
} from "./error";

describe("Error handling clases", () => {
  it("Instance of BusinessError error is created correctly and display the correct error message", () => {
    const error = new BusinessError(BusinessErrorCodes.PRODUCT_ALREADY_EXIST);
    expect(error instanceof CustomError).toBeTruthy();
    expect(error.message).toBe(BusinessErrorCodes.PRODUCT_ALREADY_EXIST);
  });
  it("Instance of Network error is created correctly and display the correct error message", () => {
    const error = new NetworkError(NetworkErrorCodes.BAD_REQUEST);
    expect(error instanceof CustomError).toBeTruthy();
    expect(error.message).toBe(NetworkErrorCodes.BAD_REQUEST);
  });
});
