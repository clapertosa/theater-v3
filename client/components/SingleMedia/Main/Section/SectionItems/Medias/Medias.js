import React, { useState } from "react";
import styled from "styled-components";
import SectionWrapper from "../../SectionWrapper";
import Images from "./Images/Images";
import Videos from "./Videos/Videos";

const ImagesTitle = styled.div`
  grid-area: option1;
  span {
    cursor: pointer;
    font-weight: ${({ highlighted }) => (highlighted ? "bold" : "normal")};
    font-size: ${({ highlighted }) => (highlighted ? "1.1rem" : "1rem")};
    text-decoration: ${({ highlighted }) =>
      highlighted ? "underline" : "none"};
    color: ${({ highlighted, theme: { colors } }) =>
      highlighted ? colors.candy : colors.white};
  }
`;

const VideosTitle = styled.div`
  grid-area: option2;
  span {
    cursor: pointer;
    font-weight: ${({ highlighted }) => (highlighted ? "bold" : "normal")};
    font-size: ${({ highlighted }) => (highlighted ? "1.1rem" : "1rem")};
    text-decoration: ${({ highlighted }) =>
      highlighted ? "underline" : "none"};
    color: ${({ highlighted, theme: { colors } }) =>
      highlighted ? colors.candy : colors.white};
  }
`;

const Medias = ({ title, images, videos }) => {
  const [option, setOption] = useState(images.length > 0 ? "images" : "videos");

  const onOptionClickHandler = e => {
    setOption(e.target.getAttribute("name"));
  };

  return (
    <SectionWrapper
      show={images.length > 0 || videos.length > 0}
      gridArea="media"
      title="Media"
      options={[
        images.length > 0 ? (
          <ImagesTitle key={0} highlighted={option === "images"}>
            <span onClick={onOptionClickHandler} name="images">
              Images
            </span>
          </ImagesTitle>
        ) : null,
        videos.length > 0 ? (
          <VideosTitle key={1} highlighted={option === "videos"}>
            <span onClick={onOptionClickHandler} name="videos">
              Videos
            </span>
          </VideosTitle>
        ) : null
      ]}
    >
      {option === "images" ? (
        <Images images={images} title={title} />
      ) : (
        <Videos videos={videos} />
      )}
    </SectionWrapper>
  );
};

export default Medias;
