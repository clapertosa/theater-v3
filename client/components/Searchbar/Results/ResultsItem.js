import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: grid;
  grid-template-areas: "poster title";
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
  margin: 5px 0;
  background-color: ${({ index, theme: { colors } }) =>
    index === 0 ? colors.gunMetal : colors.gray};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.red};
  }
`;

const Poster = styled.div`
  grid-area: poster;
  display: flex;
  width: 50px;
  height: auto;

  img {
    width: 100%;
    height: auto;
  }
`;

const Title = styled.div`
  grid-area: title;
  margin: auto;
  max-height: 75px;
  overflow: hidden;

  p {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    color: ${({ theme: { colors } }) => colors.white};
  }
`;

const ResultsItem = ({ index, image, title, url }) => {
  return (
    <Link href={url}>
      <a tabIndex={index}>
        <Container index={index % 2}>
          <Poster>
            <img src={image} alt={`${title} poster`} />
          </Poster>
          <Title>
            <p>{title}</p>
          </Title>
        </Container>
      </a>
    </Link>
  );
};

export default ResultsItem;
