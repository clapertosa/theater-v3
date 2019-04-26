import React from "react";
import styled from "styled-components";
import Link from "next/link";
import getPlaceholder from "../../../../../../utils/components/imagePlaceholder";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    color: ${({ theme: { colors } }) => colors.white};

    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
`;

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
  overflow: hidden;

  img {
    box-shadow: 3px 3px 3px black;
    height: auto;
    width: 100%;
    transition: transform 0.5s ease-out;
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

const CastCard = ({ id, imagePath, name, characterName }) => {
  const URL = "https://image.tmdb.org/t/p/w138_and_h175_face";

  return (
    <Wrapper>
      <Link href={`/person?id=${id}`}>
        <a>
          <Container>
            <Image>
              <img
                src={
                  imagePath
                    ? URL + imagePath
                    : getPlaceholder(138, 175, "No Picture")
                }
                alt={`${name} photo`}
              />
            </Image>
            <Name>{name}</Name>
            <Character>{characterName}</Character>
          </Container>
        </a>
      </Link>
    </Wrapper>
  );
};

export default CastCard;
