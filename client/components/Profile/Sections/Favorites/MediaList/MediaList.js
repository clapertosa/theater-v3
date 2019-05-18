import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "../../../../Carousel/Carousel";
import MediaItem from "./MediaItem";
import Spinner from "../../../../Spinner/Spinner";

const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  margin: 20px auto;
  width: 100%;
  grid-template-areas: "title" "content";
  min-width: 0;
`;

const Title = styled.h2`
  grid-area: title;
  margin: 0 0 10px 0;
  text-shadow: 3px 3px 3px black;
`;

const Content = styled.div`
  grid-area: content;
  min-width: 0;
  min-height: 195px;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  padding: 20px;
  border: ${({ theme: { colors } }) => `1px solid ${colors.white}`};
  border-radius: 5px;
`;

const MediaList = ({ loading, initialData, gridArea, title, mediaType }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    return setData(initialData);
  });

  return (
    <Container gridArea={gridArea}>
      <Title>{title}</Title>
      <Content>
        {loading ? (
          <Spinner />
        ) : (
          <Carousel
            arrows
            lazyLoad="ondemand"
            initialSlide={0}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: data.length > 5 ? 5 : data.length,
                  slidesToScroll: data.length > 5 ? 5 : data.length
                }
              },
              {
                breakpoint: 950,
                settings: {
                  slidesToShow: data.length > 4 ? 4 : data.length,
                  slidesToScroll: data.length > 4 ? 4 : data.length
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: data.length > 3 ? 3 : data.length,
                  slidesToScroll: data.length > 3 ? 3 : data.length
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: data.length > 2 ? 2 : data.length,
                  slidesToScroll: data.length > 2 ? 2 : data.length
                }
              },
              {
                breakpoint: 450,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]}
            slidesToShow={data.length > 5 ? 5 : data.length}
            slidesToScroll={data.length > 5 ? 5 : data.length}
          >
            {data.map(favorite => (
              <MediaItem
                key={favorite.media_id}
                mediaId={favorite.media_id}
                mediaType={mediaType}
                title={favorite.title}
                posterPath={favorite.poster_path}
              />
            ))}
          </Carousel>
        )}
      </Content>
    </Container>
  );
};

export default MediaList;
