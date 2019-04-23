import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-areas: "image" "name" "character";
  grid-row-gap: 5px;
`;

const Image = styled.div`
  grid-area: image;
  margin: auto;
  height: 175px;
  width: 138px;

  img {
    box-shadow: 3px 3px 3px black;
    height: auto;
    width: 100%;
  }
`;

const Name = styled.div`
  grid-area: name;
  margin: auto;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
`;

const Character = styled.span`
  grid-area: character;
  margin: auto;
  font-size: 0.9rem;
  text-align: center;
`;

const CastCard = ({ image, name, characterName }) => {
  return (
    <Container>
      <Image>
        <img src={image} alt={`${name} photo`} />
      </Image>
      <Name>{name}</Name>
      <Character>{characterName}</Character>
    </Container>
  );
};

export default CastCard;
