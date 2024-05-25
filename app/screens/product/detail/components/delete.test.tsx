import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DeleteProduct from "./delete";
import { COMMON_MESSAGES } from "../../../../constants/messages";
import product_service from "../../../../services/product/product-service";
import { BusinessError, BusinessErrorCodes } from "../../../../classes/error";

jest.mock("@react-navigation/native");
jest.mock("../../../../services/product/product-service");

describe("Delete product component: ask for delete confirmation", () => {
  afterEach(() => {
    cleanup();
  });

  it("Presses the confirm button and fails the elimination", async () => {
    (product_service.delete as jest.Mock).mockRejectedValueOnce(
      new BusinessError(BusinessErrorCodes.PRODUCT_NOT_FOUND)
    );

    (useRoute as jest.Mock).mockReturnValue({
      params: {},
    });
    const { getByText, queryByText } = render(<DeleteProduct id="test" />);
    const confirmButton = getByText(COMMON_MESSAGES.CONFIRM_BUTTON);

    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(queryByText(BusinessErrorCodes.PRODUCT_NOT_FOUND)).toBeDefined();
    });
  });
});
