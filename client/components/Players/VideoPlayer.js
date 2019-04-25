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

const Video = styled.div`
  position: relative;
  margin: auto;
  height: 100vh;

  iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 98%;
    height: 50%;
    max-width: 800px;
    border: 0;

    @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
        mediaQueryMinWidth}) {
      width: 80%;
    }
  }
`;

const VideoPlayer = ({ closePlayer, videos, index }) => {
  return (
    <Container>
      <Carousel
        arrows
        initialSlide={index}
        slidesToShow={1}
        slidesToScroll={1}
        lazyLoad="ondemand"
      >
        {videos.map((video, index) => (
          <div key={index}>
            <Video>
              <iframe
                type="text/html"
                src={`http://www.youtube.com/embed/${video.key}`}
                allowFullScreen
                allowTransparency
              />
            </Video>
          </div>
        ))}
      </Carousel>
      <CloseIcon closePlayer={closePlayer} className="icon-cancel" />
    </Container>
  );
};

export default VideoPlayer;
