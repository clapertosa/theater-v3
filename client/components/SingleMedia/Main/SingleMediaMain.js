import React from "react";
import styled from "styled-components";
import Cast from "./Section/SectionItems/Cast/Cast";
import Medias from "./Section/SectionItems/Medias/Medias";
import Recommendations from "./Section/SectionItems/Recommendations/Recommendations";

const Container = styled.div`
  width: 95%;
  margin: 20px auto;
  grid-area: main;
  display: grid;
  grid-template-areas: "cast" "media" "recommendations" "similar";

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 70%;
  }

  @media (min-width: 55rem) and (max-width: 80rem) {
    width: 95%;
  }
`;

const SingleMediaMain = ({
  title,
  mediaType,
  cast,
  images,
  videos,
  recommendations
}) => {
  return (
    <Container>
      <Cast cast={cast} />
      <Medias title={title} images={images} videos={videos} />
      <Recommendations
        mediaType={mediaType}
        recommendations={recommendations}
      />
    </Container>
  );
};

export default SingleMediaMain;
