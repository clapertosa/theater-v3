import React, { useState } from "react";
import Carousel from "../../../../../../Carousel/Carousel";
import VideoCard from "./VideoCard";
import VideoPlayer from "../../../../../../Players/VideoPlayer";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Videos = ({ videos }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [index, setIndex] = useState(0);

  const setVideoIndex = index => {
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
              slidesToShow: videos.length > 3 ? 3 : videos.length,
              slidesToScroll: videos.length > 3 ? 3 : videos.length
            }
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: videos.length > 2 ? 2 : videos.length,
              slidesToScroll: videos.length > 2 ? 2 : videos.length
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
        slidesToShow={videos.length > 3 ? 3 : videos.length}
        slidesToScroll={videos.length > 3 ? 3 : videos.length}
        lazyLoad="ondemand"
      >
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            index={index}
            videoId={video.key}
            openPlayer={openPlayer}
            setVideoIndex={setVideoIndex}
            title={video.name}
          />
        ))}
      </Carousel>
      <TransitionGroup component={null}>
        {showPlayer ? (
          <CSSTransition classNames="fade" timeout={300}>
            <VideoPlayer
              closePlayer={closePlayer}
              videos={videos}
              index={index}
            />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  );
};
export default Videos;
