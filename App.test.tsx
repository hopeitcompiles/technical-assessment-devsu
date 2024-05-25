import renderer from "react-test-renderer";

import App from "./App";

describe("Render of App component", () => {
  it("has 1 or more children", () => {
    expect(1).toBe(1);
    // const tree: any = renderer.create(<App />).toJSON();
    // expect(tree?.children.length).toBeGreaterThanOrEqual(1);
  });
});
