import { render, cleanup } from "@testing-library/react-native";
import ProductList from "./product-list";
import mockProducts from "../../../../../__mocks__/data/products.json";
import { ERROR_MESSAGES } from "../../../../constants/messages";

describe("Product List component: renders a of products", () => {
  afterEach(() => {
    cleanup();
  });

  it("Renders correctly and matches snapshot", async () => {
    const { toJSON, findByText } = render(
      <ProductList products={mockProducts as any} />
    );
    expect(toJSON()).toMatchSnapshot();
    expect(await findByText(mockProducts[0].name)).toBeDefined();
  });

  it("Shows text for empty list", async () => {
    const { toJSON, findByText } = render(<ProductList products={[]} />);
    expect(toJSON()).toMatchSnapshot();
    expect(
      await findByText(ERROR_MESSAGES.NO_PRODUCTS_TO_DISPLAY)
    ).toBeDefined();
  });
});
