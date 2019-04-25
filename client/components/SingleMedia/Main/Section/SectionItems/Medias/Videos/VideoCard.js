import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  cursor: pointer;
  position: relative;
  max-height: 300px;
  height: 100%;

  &:hover {
    > div {
      transform: translateY(0);
    }
  }

  img {
    margin: auto;
    width: auto;
    height: auto;
    max-height: 200px;
    box-shadow: 3px 3px 3px black;
  }
`;

const Info = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  color: ${({ theme: { colors } }) => colors.white};
  background-color: #000000b3;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  text-align: center;
`;

const VideoCard = ({ openPlayer, setVideoIndex, videoId, title, index }) => {
  const URL = `https://i1.ytimg.com/vi/${videoId}/0.jpg`;

  return (
    <Wrapper>
      <Container
        onClick={() => {
          setVideoIndex(index);
          openPlayer();
        }}
      >
        <img src={URL} alt={title} />
        <Info>
          <Title>{title}</Title>
        </Info>
      </Container>
    </Wrapper>
  );
};

export default VideoCard;
