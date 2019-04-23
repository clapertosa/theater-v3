import React from "react";
import styled from "styled-components";
import SingleMediaHeader from "../components/SingleMedia/Header/SingleMediaHeader";
import SingleMediaMain from "../components/SingleMedia/Main/SingleMediaMain";

const Container = styled.div`
  grid-template-areas: "header" "main";
  position: relative;
  display: grid;

  z-index: ${({ theme: { zIndex } }) => zIndex.singleMedia};
`;

const SingleMedia = ({ data }) => {
  return (
    <Container>
      <SingleMediaHeader
        title={data.title}
        backdropPath={data.backdropPath}
        posterPath={data.posterPath}
        overview={data.overview}
        releaseDate={data.releaseDate}
        runtime={data.runtime}
        genres={data.genres}
        director={data.director}
        voteAverage={data.voteAverage}
        voteCount={data.voteCount}
        homepage={data.homepage}
        externalIds={data.externalIds}
      />
      <SingleMediaMain
        title={data.title}
        mediaType={data.mediaType}
        cast={data.cast}
        images={data.images}
        videos={data.videos}
        recommendations={data.recommendations}
      />
    </Container>
  );
};

export default SingleMedia;
