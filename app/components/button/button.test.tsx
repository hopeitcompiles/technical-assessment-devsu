import { render, cleanup } from "@testing-library/react-native";
import Button from "./button";
import { ButtonGroup } from "../../../custom-export";
import { Icons } from "../icons/icons";

describe("Button component: renders a button with certain props", () => {
  afterEach(() => {
    cleanup();
  });

  it("Renders correctly and matches snapshot", () => {
    const { toJSON } = render(<Button>Test</Button>);
    expect(toJSON()).toMatchSnapshot();
  });

  it("Renders text inside a Text component", async () => {
    const { toJSON, findByText } = render(
      <Button testID="button">Test button</Button>
    );
    const three: any = toJSON();
    const element = await findByText("Test button");
    expect(element).toBeDefined();
    expect(three.children[0].type).toBe("Text");
    expect(three.type).toBe("View");
  });

  it("Renders an RNSVGSvgView element inside a View component", () => {
    const { toJSON } = render(
      <Button testID="button">
        <Icons.Close />
      </Button>
    );
    const three: any = toJSON();
    expect(three.children[0].type).toBe("RNSVGSvgView");
    expect(three.type).toBe("View");
  });

  it("Rendered button matched the color variant", () => {
    const { toJSON } = render(
      <ButtonGroup>
        <Button testID="button">Test button</Button>
        <Button testID="button2">Test button 2</Button>
      </ButtonGroup>
    );
    const three: any = toJSON();
    expect(three.children.length).toBe(2);
  });
});
