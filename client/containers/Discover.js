import React from "react";
import styled from "styled-components";
import Filter from "../components/Filter/Filter";
import Wrapper from "../hoc/Wrapper/Wrapper";

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas: "filter" "results" "pagination";
  grid-template-rows: auto 1fr auto;
`;

const Discover = ({ mediaType }) => {
  return (
    <Wrapper>
      <Container>
        <Filter mediaType={mediaType} />
      </Container>
    </Wrapper>
  );
};

export default Discover;
