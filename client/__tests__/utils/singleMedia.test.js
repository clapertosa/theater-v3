import { convertRuntime } from "../../utils/components/singleMedia";

describe("Runtime conversion function", () => {
  it("returns the same amount of time if runtime <= 59", () => {
    expect(convertRuntime(59)).toEqual("59min");
    expect(convertRuntime(58)).toEqual("58min");
  });

  it("returns the converted amount of time if runtime >= 60", () => {
    expect(convertRuntime(60)).toEqual("1h");
    expect(convertRuntime(120)).toEqual("2h");
    expect(convertRuntime(178)).toEqual("2h 58min");
  });

  it('return "" if runtime is not valid', () => {
    expect(convertRuntime(0)).toEqual("");
    expect(convertRuntime(-10)).toEqual("");
    expect(convertRuntime(null)).toEqual("");
    expect(convertRuntime()).toEqual("");
  });
});
