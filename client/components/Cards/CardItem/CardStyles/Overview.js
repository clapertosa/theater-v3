import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: overview;

  p {
    font-family: Montserrat-SemiBold;
    margin: 0;
    padding: 0;
    font-size: 0.9rem;
    text-align: center;
  }
`;

const Overview = ({ overview }) => {
  return (
    <Container>
      <p>
        {overview.length > 250
          ? overview.substring(0, 250).trim() + "..."
          : overview}
      </p>
    </Container>
  );
};

export default Overview;
