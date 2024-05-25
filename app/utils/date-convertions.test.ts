import { dateFormat } from "./date-convertions";

describe("Convertion util: transform dates into strings and validations", () => {
  it("Returns true of false depending on valid date format", () => {
    expect(dateFormat.isValidDate("wdawd")).toBeFalsy();
    expect(dateFormat.isValidDate("12-12-2024")).toBeTruthy();
  });

  it("Returns an Date or null depending on valid date format", () => {
    expect(dateFormat.getDateOrNull("wdawd")).toBeNull();
    expect(dateFormat.getDateOrNull("12-12-2024")).toBeTruthy();
  });
  it("Returns an formated date as string or the same input depending on date format", () => {
    expect(dateFormat.simple("wdawd")).toBe("wdawd");
    expect(dateFormat.simple("12-12-2024")).toBe("12/12/2024");
  });
  it("Returns an formated date with time as string or the same input depending on date format", () => {
    expect(dateFormat.withTime("wdawd")).toBe("wdawd");
    expect(dateFormat.withTime("12-12-2024")).toBe("12/12/2024, 00:00:00");
  });
});
