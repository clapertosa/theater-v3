import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  height: ${({ theme: { backdropPosterHeight } }) => backdropPosterHeight};
  width: 100%;
  top: 0;
  left: 0;
  filter: blur(2px) brightness(0.3);
  z-index: ${({ theme: { zIndex } }) => zIndex.backdropPoster};

  img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
`;

const BackdropImage = ({ imagePath, title }) => {
  const URL = "https://image.tmdb.org/t/p/w1400_and_h450_face";

  return (
    <Container>
      <img src={URL + imagePath} alt={`${title} backdrop`} />
    </Container>
  );
};

export default BackdropImage;
