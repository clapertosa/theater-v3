import React from "react";
import styled from "styled-components";
import CircularProgress from "../../../CircularProgress/CircularProgress";

const Container = styled.div`
  grid-area: info;
  margin: 10px;
  display: grid;
  grid-template-areas: "vote title" "vote release-date";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 5px;
`;

const Vote = styled.div`
  grid-area: vote;
  max-width: 60px;
  max-height: 60px;
`;

const Title = styled.h4`
  grid-area: title;
  margin: 0;
  padding: 0;
  text-align: right;
`;

const ReleaseDate = styled.h5`
  grid-area: release-date;
  margin: 0;
  margin-top: auto;
  padding: 0;
  text-align: right;
`;

const Info = ({ title, vote, releaseDate }) => {
  return (
    <Container>
      <Vote title="Average score">
        <CircularProgress percentage={vote * 10} text={`${vote * 10}`} />
      </Vote>
      <Title>{title}</Title>
      <ReleaseDate>{releaseDate}</ReleaseDate>
    </Container>
  );
};

export default Info;
