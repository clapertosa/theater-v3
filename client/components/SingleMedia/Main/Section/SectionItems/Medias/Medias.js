import React, { useState } from "react";
import styled from "styled-components";
import SectionWrapper from "../../SectionWrapper";
import Carousel from "../../../../../Carousel/Carousel";
import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";

const Images = styled.div`
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

const Videos = styled.div`
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
          <Images key={0} highlighted={option === "images"}>
            <span onClick={onOptionClickHandler} name="images">
              Images
            </span>
          </Images>
        ) : null,
        videos.length > 0 ? (
          <Videos key={1} highlighted={option === "videos"}>
            <span onClick={onOptionClickHandler} name="videos">
              Videos
            </span>
          </Videos>
        ) : null
      ]}
    >
      {option === "images" ? (
        <Carousel
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: images.length > 3 ? 3 : images.length,
                slidesToScroll: images.length > 3 ? 3 : images.length
              }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: images.length > 2 ? 2 : images.length,
                slidesToScroll: images.length > 2 ? 2 : images.length
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]}
          arrows
          initialSlide={0}
          slidesToShow={images.length > 3 ? 3 : images.length}
          slidesToScroll={images.length > 3 ? 3 : images.length}
          lazyLoad="ondemand"
        >
          {images.map((image, index) => (
            <ImageCard key={index} imagePath={image.file_path} title={title} />
          ))}
        </Carousel>
      ) : (
        <Carousel
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: videos.length > 3 ? 3 : videos.length,
                slidesToScroll: videos.length > 3 ? 3 : videos.length
              }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: videos.length > 2 ? 2 : videos.length,
                slidesToScroll: videos.length > 2 ? 2 : videos.length
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]}
          arrows
          initialSlide={0}
          slidesToShow={videos.length > 3 ? 3 : videos.length}
          slidesToScroll={videos.length > 3 ? 3 : videos.length}
          lazyLoad="ondemand"
        >
          {videos.map(video => (
            <VideoCard key={video.key} videoId={video.key} title={video.name} />
          ))}
        </Carousel>
      )}
    </SectionWrapper>
  );
};

export default Medias;
