import React from "react";
import styled from "styled-components";
import Link from "next/link";
import getPlaceholder from "../../../../../../utils/components/imagePlaceholder";

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 3px auto;
  height: auto;
  max-width: 300px;

  a {
    text-decoration: none;
    position: relative;

    &:hover {
      > div {
        transform: translateY(0);
      }
    }
  }

  img {
    height: 100%;
    width: auto;
    box-shadow: 3px 3px 3px black;
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-areas: "title vote";
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  color: ${({ theme: { colors } }) => colors.white};
  background-color: #000000b3;
  transform: translateY(200%);
  transition: transform 0.3s ease-out;
`;

const Title = styled.h3`
  grid-area: title;
  margin: 0;
  font-size: 1rem;
`;

const Vote = styled.div`
  grid-area: vote;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  i {
    color: yellow;
  }

  span {
    font-weight: bold;
  }
`;

const RecommendationCard = ({
  mediaType,
  id,
  imagePath,
  title,
  voteAverage
}) => {
  const RECOMMENDATIONS_POSTER_PATH = "https://image.tmdb.org/t/p/w185";

  return (
    <Container>
      <Link href={`/${mediaType === "movie" ? "movies" : "series"}?id=${id}`}>
        <a>
          <img
            src={
              imagePath
                ? RECOMMENDATIONS_POSTER_PATH + imagePath
                : getPlaceholder(185, 278, "No Poster")
            }
            alt={`${title} poster`}
          />
          <Info>
            <Title>{title}</Title>
            <Vote>
              <i className="icon-star-1" />
              <span>{voteAverage}</span>
            </Vote>
          </Info>
        </a>
      </Link>
    </Container>
  );
};

export default RecommendationCard;
