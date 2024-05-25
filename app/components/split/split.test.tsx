import { render, cleanup } from "@testing-library/react-native";
import Split from "./split";
import { Icons } from "../icons/icons";

describe("Split component: renders a two children splitted horizontally", () => {
  afterEach(() => {
    cleanup();
  });

  it("Renders correctly and matches snapshot", () => {
    const { toJSON } = render(
      <Split>
        <Icons.ChevronRight />
        <Icons.MoneyBill />
      </Split>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("Renders exactly 2 elements inside a View component", () => {
    const { toJSON } = render(
      <Split>
        <Icons.ChevronRight />
        <Icons.MoneyBill />
      </Split>
    );
    const three: any = toJSON();
    expect(three.children.length).toBe(2);
    expect(three.type).toBe("View");
  });
});
