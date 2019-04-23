import React from "react";
import SectionWrapper from "../../SectionWrapper";
import Carousel from "../../../../../Carousel/Carousel";
import CastCard from "./CastCard";

const Cast = ({ cast }) => {
  return (
    <SectionWrapper show={cast.length > 0} gridArea="cast" title="Cast">
      <Carousel
        arrows
        initialSlide={0}
        slidesToShow={cast.length > 5 ? 5 : cast.length}
        slidesToScroll={cast.length > 5 ? 5 : cast.length}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: cast.length > 5 ? 5 : cast.length,
              slidesToScroll: cast.length > 5 ? 5 : cast.length
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: cast.length > 3 ? 3 : cast.length,
              slidesToScroll: cast.length > 3 ? 3 : cast.length
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: cast.length > 2 ? 2 : cast.length,
              slidesToScroll: cast.length > 2 ? 2 : cast.length
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]}
        lazyLoad="ondemand"
      >
        {cast.map(member => (
          <CastCard
            key={member.id}
            image={member.profile_path}
            name={member.name}
            characterName={member.character}
          />
        ))}
      </Carousel>
    </SectionWrapper>
  );
};

export default Cast;
