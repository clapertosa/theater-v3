import React from "react";
import styled from "styled-components";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 300px;
  height: 100%;

  img {
    margin: 10px auto;
    width: 80%;
    height: auto;
    box-shadow: 3px 3px 3px black;
    transition: transform 0.5s ease-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const ImageCard = ({ openPlayer, setImageIndex, imagePath, index, title }) => {
  const URL = "https://image.tmdb.org/t/p/w780";

  return (
    <Container
      onClick={() => {
        setImageIndex(index);
        openPlayer();
      }}
    >
      <img src={URL + imagePath} alt={`${title} backdrop`} />
    </Container>
  );
};

export default ImageCard;
