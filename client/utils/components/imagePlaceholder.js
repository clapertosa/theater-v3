const URL = "https://via.placeholder.com";

export default (
  width,
  height,
  text,
  backgroundColor = "2b2d42",
  textColor = "edf2f4"
) => {
  if (!width || !height) {
    throw new Error("Width and height are required");
  }
  return `${URL}/${width}x${height}/${backgroundColor}/${textColor}${
    text ? `?text=${text}` : ""
  }`;
};
