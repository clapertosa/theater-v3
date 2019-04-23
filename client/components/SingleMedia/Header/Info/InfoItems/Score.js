import React from "react";
import styled from "styled-components";
import CircularProgress from "../../../../CircularProgress/CircularProgress";

const Container = styled.div`
  grid-area: score;
  display: grid;
  grid-template-areas: "icon text";
  grid-template-columns: auto 1fr;
  grid-column-gap: 5px;
  margin: auto;

  span {
    grid-area: text;
    margin: auto 0 auto 0;
    text-shadow: 3px 3px 3px black;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: auto 0;
  }
`;

const Score = ({ voteAverage, voteCount }) => {
  return (
    <Container>
      <CircularProgress
        percentage={voteAverage * 10}
        text={voteAverage * 10}
        width="80px"
        gridArea="icon"
      />
      <span>{voteCount} votes</span>
    </Container>
  );
};

export default Score;
