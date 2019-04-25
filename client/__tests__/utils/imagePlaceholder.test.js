import { default as getPlaceholder } from "../../utils/components/imagePlaceholder";

describe("ImagePlaceholder default function", () => {
  it("returns the correct URL", () => {
    const completeUrl =
      "https://via.placeholder.com/138x175/2b2d42/edf2f4?text=placeholder";
    const generatedUrl = getPlaceholder(
      138,
      175,
      "placeholder",
      "2b2d42",
      "edf2f4"
    );

    expect(generatedUrl).toEqual(completeUrl);
  });

  it("returns the correct URL without any custom text", () => {
    const completeUrl = "https://via.placeholder.com/138x175/2b2d42/edf2f4";
    const generatedUrl = getPlaceholder(138, 175);

    expect(generatedUrl).toEqual(completeUrl);
  });

  it("throws an error if width or height are not provided", () => {
    let error;
    // Width only
    try {
      getPlaceholder(138);
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(Error);

    // Height only
    try {
      getPlaceholder(null, 175);
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(Error);
  });
});
