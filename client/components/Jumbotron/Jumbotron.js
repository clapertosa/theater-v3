import React from "react";
import Link from "next/link";
import styled from "styled-components";
import getMedias from "../../../utils/jumbotron_data";
import Carousel from "../Carousel/Carousel";

const Container = styled.div`
  grid-area: jumbotron;
  min-width: 0;
  height: 40rem;
  width: auto;
`;

const BackdropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: ${({ imageUrl, backdropPath }) =>
    `url(${imageUrl}w1280${backdropPath})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;

  a {
    position: absolute;
    width: 100%;
    height: 100%;

    &:hover {
      div {
        background-color: black;
      }
    }
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    background-image: ${({ imageUrl, backdropPath }) =>
      `url(${imageUrl}original${backdropPath})`};
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-areas: "title" "overview";
  position: absolute;
  bottom: 0;
  width: 100%;
  color: ${({ theme: { colors } }) => colors.white};
  padding: 10px;
  background-color: #000000b3;
  transition: background-color 0.7s;

  h2 {
    text-align: center;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    h2 {
      text-align: left;
    }
  }
`;

const Title = styled.h2`
  grid-area: title;
  margin: 0;
  padding: 0;
`;

const Overview = styled.p`
  grid-area: overview;
`;

const Jumbotron = ({ data }) => {
  let medias = getMedias(data);
  const imageUrl = "https://image.tmdb.org/t/p/";

  return (
    <Container>
      <Carousel
        initialSlide={0}
        slidesToShow={1}
        slidesToScroll={1}
        arrows
        autoplay
        autoplaySpeed={8000}
      >
        {medias.map(media => (
          <BackdropContainer
            key={media.id}
            imageUrl={imageUrl}
            backdropPath={media.backdrop_path}
          >
            <Link
              href={
                media.first_air_date
                  ? `series?id=${media.id}`
                  : `movies?id=${media.id}`
              }
            >
              <a>
                <Info>
                  <Title>
                    {media.title ||
                      media.original_title ||
                      media.name ||
                      media.original_name}
                  </Title>
                  <Overview>{media.overview}</Overview>
                </Info>
              </a>
            </Link>
          </BackdropContainer>
        ))}
      </Carousel>
    </Container>
  );
};

export default Jumbotron;
