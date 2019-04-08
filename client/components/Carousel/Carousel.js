import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

const NextButton = styled.i`
  cursor: pointer;
  display: flex !important;
  align-items: center;
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  color: ${({ theme: { colors } }) => colors.gray};
  font-size: 3rem;
  z-index: ${({ theme: { zIndex } }) => zIndex.carouselArrows};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme: { colors } }) => colors.white};
  }
`;

const PrevButton = styled.i`
  cursor: pointer;
  display: flex !important;
  align-items: center;
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  color: ${({ theme: { colors } }) => colors.gray};
  font-size: 3rem;
  z-index: ${({ theme: { zIndex } }) => zIndex.carouselArrows};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme: { colors } }) => colors.white};
  }
`;

const settings = {
  infinite: true,
  speed: 1000,
  dots: false,
  nextArrow: (
    <NextButton>
      <i className="icon-right-circle" />
    </NextButton>
  ),
  prevArrow: (
    <PrevButton>
      <i className="icon-left-circle" />
    </PrevButton>
  )
};

const Carousel = ({
  children,
  initialSlide,
  slidesToShow,
  slidesToScroll,
  arrows,
  autoplay,
  autoplaySpeed,
  responsive,
  lazyLoad
}) => {
  return (
    <Slider
      {...settings}
      initialSlide={initialSlide}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      arrows={arrows}
      autoplay={autoplay}
      autoplaySpeed={autoplaySpeed}
      responsive={responsive}
      lazyLoad={lazyLoad}
    >
      {children}
    </Slider>
  );
};

export default Carousel;
