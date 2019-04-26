import React from "react";
import styled from "styled-components";
import Name from "./InfoItems/Name";
import Links from "./InfoItems/Links";
import Description from "./InfoItems/Description";
import TechnicalInfo from "./InfoItems/TechnicalInfo";

const Container = styled.div`
  grid-area: info;
  margin: auto;
  max-width: 700px;
  display: grid;
  grid-template-areas: "name name" "technical-info technical-info" "links links" "description description";
  grid-template-rows: auto auto auto 1fr;
  grid-row-gap: 20px;
  font-weight: bold;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: 0;
  }
`;

const Info = ({
  name,
  role,
  birthday,
  deathday,
  gender,
  placeOfBirth,
  biography,
  homepage,
  externalIds
}) => {
  return (
    <Container>
      <Name>{name}</Name>
      <TechnicalInfo
        role={role}
        birthday={birthday}
        deathday={deathday}
        gender={gender}
        placeOfBirth={placeOfBirth}
      />
      <Links homepage={homepage} externalIds={externalIds} />
      <Description biography={biography} />
    </Container>
  );
};

export default Info;
