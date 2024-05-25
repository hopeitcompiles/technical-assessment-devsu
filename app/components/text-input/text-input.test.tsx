import { render, cleanup } from "@testing-library/react-native";
import TextInput from "./text-input";

describe("Split component: renders a two children splitted horizontally", () => {
  afterEach(() => {
    cleanup();
  });

  it("Renders correctly and matches snapshot, includes label and error", async () => {
    const { toJSON, findByText } = render(
      <TextInput label="Test" error="Error" />
    );
    expect(toJSON()).toMatchSnapshot();
    expect(await findByText("Test")).toBeDefined();
    expect(await findByText("Error")).toBeDefined();
  });

  it("Renders exactly 1 element inside a View component wihtout Error either Label with keepErrorMargin as false", () => {
    const { toJSON } = render(<TextInput keepErrorMargin={false} />);
    const three: any = toJSON();
    expect(three.children.length).toBe(1);
    expect(three.type).toBe("View");
  });

  it("Renders exactly 2 element inside a View component when sending Error", async () => {
    const { toJSON, findByText } = render(<TextInput error="Error" />);
    const threeError: any = toJSON();
    expect(threeError.children.length).toBe(2);
    expect(threeError.type).toBe("View");
    expect(await findByText("Error")).toBeDefined();
  });

  it("Renders exactly 3 element inside a View component when sending Label with keepErrorMargin as true or not including the prop", async () => {
    const { toJSON, findByText } = render(<TextInput label="Label" />);
    const threeLabel: any = toJSON();
    expect(threeLabel.children.length).toBe(3);
    expect(threeLabel.type).toBe("View");
    expect(await findByText("Label")).toBeDefined();
  });

  it("Renders exactly 2 element inside a View component when sending Label with keepErrorMargin as false", async () => {
    const { toJSON, findByText } = render(
      <TextInput label="Label" keepErrorMargin={false} />
    );
    const threeLabel: any = toJSON();
    expect(threeLabel.children.length).toBe(2);
    expect(threeLabel.type).toBe("View");
    expect(await findByText("Label")).toBeDefined();
  });

  it("Renders exactly 3 element inside a View component when sending Error and Label", () => {
    const { toJSON } = render(<TextInput label="Test" error="Error" />);
    const three: any = toJSON();
    expect(three.children.length).toBe(3);
    expect(three.type).toBe("View");
  });
});
