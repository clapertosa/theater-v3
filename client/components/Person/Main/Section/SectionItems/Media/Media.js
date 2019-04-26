import React from "react";
import SectionWrapper from "../../SectionWrapper";
import Carousel from "../../../../../Carousel/Carousel";
import MediaCard from "./MediaCard";

const Media = ({ medias }) => {
  return (
    <SectionWrapper
      show={medias.length > 0}
      gridArea="posters"
      title="Known for"
    >
      <Carousel
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: medias.length > 3 ? 3 : medias.length,
              slidesToScroll: medias.length > 3 ? 3 : medias.length
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: medias.length > 2 ? 2 : medias.length,
              slidesToScroll: medias.length > 2 ? 2 : medias.length
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]}
        arrows
        initialSlide={0}
        slidesToShow={medias.length > 3 ? 3 : medias.length}
        slidesToScroll={medias.length > 3 ? 3 : medias.length}
        lazyLoad="ondemand"
      >
        {medias.map(media => (
          <MediaCard
            key={media.id}
            mediaType={media.media_type}
            id={media.id}
            imagePath={media.poster_path}
            title={
              media.title ||
              media.original_title ||
              media.name ||
              media.original_name
            }
            voteAverage={media.vote_average}
          />
        ))}
      </Carousel>
    </SectionWrapper>
  );
};

export default Media;
