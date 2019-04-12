import React from "react";
import styled from "styled-components";
import { getProfileImageUrl } from "../../../../../utils/components/filter";
import Spinner from "../../../../Spinner/Spinner";

const Container = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  max-height: ${({ show }) => (show ? "350px" : "0")};
  width: 100%;
  overflow: ${({ loading }) => (loading ? "hidden" : "auto")};
  color: ${({ theme: { colors } }) => colors.white};
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  box-shadow: 3px 3px 3px black;
  scrollbar-color: ${({ theme: { colors } }) => `${colors.gunMetal} silver`};
  scrollbar-width: auto;
  z-index: ${({ theme: { zIndex } }) => zIndex.filter};
  transition: max-height 0.3s;
`;

const ResultItem = styled.li`
  cursor: pointer;
  list-style: none;
  display: grid;
  grid-template-areas: "profile-image name";
  grid-template-columns: auto auto;
  padding: 5px;
  background-color: ${({ index, theme: { colors } }) =>
    index === 0 ? colors.gunMetal : colors.gray};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.red};
  }
`;

const ImageContainer = styled.div`
  grid-area: profile-image;
  height: 68px;
  width: auto;

  img {
    height: 100%;
    max-width: 45px;
    width: auto;
  }
`;

const NameContainer = styled.div`
  grid-area: name;
  display: flex;
  align-items: center;
`;

const CastResults = ({ showResults, loading, results, clicked }) => {
  return (
    <Container show={showResults} loading={loading}>
      {loading ? (
        <Spinner />
      ) : (
        results.map((person, index) => (
          <ResultItem
            key={person.id}
            index={index % 2}
            tabIndex={index}
            className="cast-item"
            onClick={() => clicked(person.id, person.name)}
          >
            <ImageContainer>
              <img
                src={getProfileImageUrl(person.profile_path)}
                alt={`${person.name} profile picture`}
              />
            </ImageContainer>
            <NameContainer>
              <span>{person.name}</span>
            </NameContainer>
          </ResultItem>
        ))
      )}
    </Container>
  );
};

export default CastResults;
