import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-height: 300px;
  height: 100%;

  img {
    margin: 10px auto;
    width: 80%;
    height: auto;
    box-shadow: 3px 3px 3px black;
  }
`;

const ImageCard = ({ imagePath, title }) => {
  return (
    <Container>
      <img src={imagePath} alt={`${title} backdrop`} />
    </Container>
  );
};

export default ImageCard;
