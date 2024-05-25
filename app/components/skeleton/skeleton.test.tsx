import { render, cleanup } from "@testing-library/react-native";
import Skeleton from "./skeleton";
import { Icons } from "../icons/icons";

describe("Skeleton component: renders styled view while other things are loading", () => {
  afterEach(() => {
    cleanup();
  });

  it("Renders correctly and matches snapshot", () => {
    const { toJSON } = render(<Skeleton />);
    expect(toJSON()).toMatchSnapshot();
  });
});
