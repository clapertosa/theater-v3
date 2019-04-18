import { getNumbers } from "../../utils/components/pagination";

describe("Pagination utils", () => {
  it("when currentPage === 1", () => {
    expect(getNumbers(1, 2)).toEqual([1, 2]);
    expect(getNumbers(1, 100)).toEqual([1, 2, 3, 4, 5]);
    expect(getNumbers(1, 1000)).toEqual([1, 2, 3, 4, 5]);
  });

  it("when totalPages <= 5", () => {
    expect(getNumbers(2, 4)).toEqual([1, 2, 3, 4]);
    expect(getNumbers(3, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("when currentPage > 1 and totalPages > currentPage + 2", () => {
    expect(getNumbers(90, 92)).toEqual([88, 89, 90, 91, 92]);
  });

  it("when currentPage > 1 and totalPages > currentPage + 1", () => {
    expect(getNumbers(90, 91)).toEqual([88, 89, 90, 91]);
  });

  it("when currentPage === totalPages", () => {
    expect(getNumbers(90, 90)).toEqual([88, 89, 90]);
    expect(getNumbers(1, 1)).toEqual([1]);
    expect(getNumbers(3, 3)).toEqual([1, 2, 3]);
  });
});
