import React from "react";
import SectionWrapper from "../../SectionWrapper";
import Carousel from "../../../../../Carousel/Carousel";
import RecommendationCard from "./RecommendationCard";

const Recommendations = ({ recommendations, mediaType }) => {
  return (
    <SectionWrapper
      show={recommendations.length > 0}
      gridArea="recommendations"
      title="Recommended"
    >
      <Carousel
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow:
                recommendations.length > 3 ? 3 : recommendations.length,
              slidesToScroll:
                recommendations.length > 3 ? 3 : recommendations.length
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow:
                recommendations.length > 2 ? 2 : recommendations.length,
              slidesToScroll:
                recommendations.length > 2 ? 2 : recommendations.length
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
        slidesToShow={recommendations.length > 3 ? 3 : recommendations.length}
        slidesToScroll={recommendations.length > 3 ? 3 : recommendations.length}
        lazyLoad="ondemand"
      >
        {recommendations.map(recommended => (
          <RecommendationCard
            key={recommended.id}
            mediaType={mediaType}
            id={recommended.id}
            imagePath={recommended.poster_path}
            title={
              recommended.title ||
              recommended.original_title ||
              recommended.name ||
              recommended.original_name
            }
            voteAverage={recommended.vote_average}
          />
        ))}
      </Carousel>
    </SectionWrapper>
  );
};

export default Recommendations;
