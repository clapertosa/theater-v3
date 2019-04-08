import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 18rem;
  height: 9.875rem;
  margin: auto;

  &:hover {
    .slideCard-info {
      transform: translateY(0);
    }
  }

  a {
    text-decoration: none;
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
  transform: translateY(100%);
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

const Image = styled.img`
  margin: 10px auto;
  width: 100%;
  height: auto;
`;

const SlidingCardsItem = ({ media }) => {
  const imageUrl = "https://image.tmdb.org/t/p/";

  return (
    <Container>
      <Link
        href={
          media.first_air_date
            ? `series?id=${media.id}`
            : `movies?id=${media.id}`
        }
      >
        <a>
          <Image
            src={imageUrl + "w300" + media.backdrop_path}
            alt={`${media.title || media.name} backdrop`}
          />
          <Info className="slideCard-info">
            <Title>
              {media.title ||
                media.original_title ||
                media.name ||
                media.original_name}
            </Title>
            <Vote>
              <i className="icon-star-1" />
              <span>{media.vote_average}</span>
            </Vote>
          </Info>
        </a>
      </Link>
    </Container>
  );
};

export default SlidingCardsItem;
