import React from "react";
import styled from "styled-components";
import Media from "./Section/SectionItems/Media/Media";

const Container = styled.div`
  width: 95%;
  margin: 20px auto;
  grid-area: main;
  display: grid;
  grid-template-areas: "posters";

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 70%;
  }

  @media (min-width: 55rem) and (max-width: 80rem) {
    width: 95%;
  }
`;

const PersonMain = ({ medias }) => {
  return (
    <Container>
      <Media medias={medias} />
    </Container>
  );
};

export default PersonMain;
