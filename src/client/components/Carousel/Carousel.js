import React from "react";
import Slider from "react-slick";
import Card from "./Card/Card";
import styles from "./Carousel.scss";

const Carousel = props => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    lazyLoad: true,
    arrows: true,
    className: styles.slides,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return props.itemsNumber > 6 ? (
    <div className={styles["slider-container"]}>
      <Slider {...settings}>
        {props.data.map(media => {
          return (
            <div key={media.media_id + media.media_title}>
              <Card
                id={media.media_id}
                mediaType={media.media_type}
                title={media.media_title}
                poster={media.media_poster_path}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  ) : (
    <div className={styles["normal-container"]}>
      {props.data.map(media => {
        return (
          <div key={media.media_id + media.media_title}>
            <Card
              id={media.media_id}
              mediaType={media.media_type}
              title={media.media_title}
              poster={media.media_poster_path}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
