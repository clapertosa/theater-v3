import React, { useState } from "react";
import Carousel from "../../../../../../Carousel/Carousel";
import ImageCard from "./ImageCard";
import ImagePlayer from "../../../../../../Players/ImagePlayer";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Images = ({ images, title }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [index, setIndex] = useState(0);

  const setImageIndex = index => {
    setIndex(index);
  };

  const openPlayer = () => {
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
  };

  return (
    <>
      <Carousel
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: images.length > 3 ? 3 : images.length,
              slidesToScroll: images.length > 3 ? 3 : images.length
            }
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: images.length > 2 ? 2 : images.length,
              slidesToScroll: images.length > 2 ? 2 : images.length
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
        slidesToShow={images.length > 3 ? 3 : images.length}
        slidesToScroll={images.length > 3 ? 3 : images.length}
        lazyLoad="ondemand"
      >
        {images.map((image, index) => (
          <ImageCard
            key={index}
            index={index}
            openPlayer={openPlayer}
            setImageIndex={setImageIndex}
            imagePath={image.file_path}
            title={title}
          />
        ))}
      </Carousel>
      <TransitionGroup>
        {showPlayer ? (
          <CSSTransition classNames="fade" timeout={300}>
            <ImagePlayer
              images={images}
              index={index}
              closePlayer={closePlayer}
            />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  );
};

export default Images;
