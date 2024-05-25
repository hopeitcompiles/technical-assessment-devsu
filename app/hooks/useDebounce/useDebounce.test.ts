import { renderHook, act } from "@testing-library/react-hooks";
import useDebounce from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce test: wait x time until execute last callback", () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  it("Should invoke last callback function after certain delay or default 400 ms, if another is invoked before delay only the last one should be called", async () => {
    const { result } = renderHook(() => useDebounce());

    act(() => {
      result.current(callback);
      jest.advanceTimersByTime(100);
      result.current(callback, 500);
      jest.advanceTimersByTime(450);
      result.current(callback, 100);
    });
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it("Should handle delay time even if it's negative", async () => {
    const { result } = renderHook(() => useDebounce());

    act(() => {
      result.current(callback, -200);
    });
    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
