import React from "react";
import styled from "styled-components";
import CloseIcon from "./CloseIcon";
import Carousel from "../Carousel/Carousel";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000b3;
  height: 100%;
  width: 100%;
  z-index: ${({ theme: { zIndex } }) => zIndex.player};
`;

const Image = styled.div`
  position: relative;
  margin: auto;
  width: 95%;
  height: 100vh;

  img {
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    object-fit: contain;
    object-position: center;
    width: 100%;

    @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
        mediaQueryMinWidth}) {
      height: 95%;
    }
  }
`;

const ImagePlayer = ({ closePlayer, images, index }) => {
  const URL = "https://image.tmdb.org/t/p/original";

  return (
    <Container>
      <Carousel
        arrows
        initialSlide={index}
        slidesToShow={1}
        slidesToScroll={1}
        lazyLoad="ondemand"
      >
        {images.map((image, index) => (
          <div key={index}>
            <Image>
              <img src={URL + image.file_path} />
            </Image>
          </div>
        ))}
      </Carousel>
      <CloseIcon closePlayer={closePlayer} />
    </Container>
  );
};

export default ImagePlayer;
