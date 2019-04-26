import React from "react";
import styled from "styled-components";
import Poster from "../../Poster/Poster";
import Info from "./Info/Info";

const Container = styled.div`
  width: 95%;
  margin: 10px auto auto auto;
  grid-area: header;
  display: grid;
  grid-template-areas: "poster" "info";
  grid-row-gap: 20px;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 70%;

    grid-template-areas: "poster info";
    grid-template-columns: auto auto;
    grid-column-gap: 20px;
  }

  @media (min-width: 55rem) and (max-width: 80rem) {
    width: 95%;
  }
`;

const PersonHeader = ({
  name,
  profilePath,
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
      <Poster title={name} posterPath={profilePath} />
      <Info
        name={name}
        role={role}
        birthday={birthday}
        deathday={deathday}
        gender={gender}
        placeOfBirth={placeOfBirth}
        biography={biography}
        homepage={homepage}
        externalIds={externalIds}
      />
    </Container>
  );
};

export default PersonHeader;
