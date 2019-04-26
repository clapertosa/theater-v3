import React from "react";
import styled from "styled-components";
import PersonHeader from "../components/Person/Header/PersonHeader";
import PersonMain from "../components/Person/Main/PersonMain";

const Container = styled.div`
  grid-template-areas: "header" "main";
  position: relative;
  display: grid;
`;

const Person = ({ data }) => {
  return (
    <Container>
      <PersonHeader
        name={data.name}
        profilePath={data.profile_path}
        role={data.known_for_department}
        birthday={data.birthday}
        deathday={data.deathday}
        gender={data.gender}
        placeOfBirth={data.place_of_birth}
        biography={data.biography}
        homepage={data.homepage}
        externalIds={data.external_ids}
      />
      <PersonMain medias={data.combined_credits.cast.slice(0, 60)} />
    </Container>
  );
};

export default Person;
