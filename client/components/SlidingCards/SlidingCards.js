import React from "react";
import styled from "styled-components";
import SlidingCardsItem from "./SlidingCardsItem";
import Carousel from "../Carousel/Carousel";
import getMedias from "../../utils/components/slidingCards_data";

const carouselResponsiveness = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true
    }
  },
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 2
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
];

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "title" "cards";
  grid-template-rows: auto 1fr;
  grid-row-gap: 10px;
  margin: 30px 20px;
`;

const Title = styled.h2`
  grid-area: title;
  margin: 0;
  color: ${({ theme: { colors } }) => colors.white};
  text-shadow: 3px 3px 3px black;
  text-transform: uppercase;
`;

const Container = styled.div`
  grid-area: cards;
  min-width: 0;
  background-color: #00000080;
  padding: 30px 10px;
`;

const SlidingCards = ({ title, data }) => {
  const medias = getMedias(data);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Container>
        <Carousel
          initialSlide={0}
          slidesToShow={4}
          slidesToScroll={4}
          arrows
          responsive={carouselResponsiveness}
          lazyLoad="ondemand"
        >
          {medias.map(media => (
            <SlidingCardsItem key={media.id} media={media} />
          ))}
        </Carousel>
      </Container>
    </Wrapper>
  );
};

export default SlidingCards;
