import React, { useState } from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Filter from "./Filter";
import MediaItem from "./MediaItem";
import Pagination from "../../../../Pagination/Pagination";

const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  display: grid;
  grid-template-areas: "title" "main";
`;

const Title = styled.div`
  grid-area: title;
  display: flex;

  h1 {
    cursor: pointer;
    display: flex;
    i {
      transition: transform 0.3s;
      transform: ${({ showList }) =>
        showList ? "rotate(-180deg)" : "rotate(0)"};
    }
  }
`;

const Main = styled.div`
  grid-area: main;
  display: grid;
  grid-template-areas: "filter" "media" "pagination";
  border: ${({ showList }) => (showList ? "1px solid black" : null)};
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  box-shadow: ${({ showList }) => (showList ? "3px 3px 3px black" : null)};
  max-height: ${({ showList }) => (showList ? "900px" : "0")};
  transition: max-height 0.3s;
  overflow: hidden;
`;

const Media = styled.div`
  grid-area: media;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
`;

const MediaList = ({ gridArea, data, title, mediaType }) => {
  const [showList, setShowList] = useState(true);
  const showListToggle = () => {
    setShowList(showList => !showList);
  };

  return data.length > 0 ? (
    <Container gridArea={gridArea}>
      <Title showList={showList}>
        <h1 onClick={showListToggle}>
          {title} <i className="icon-down-open" />
        </h1>
      </Title>
      <Main showList={showList}>
        <Filter />
        <Media>
          <TransitionGroup component={null}>
            {data.map(media => (
              <CSSTransition
                key={media.media_id}
                classNames="fade"
                timeout={300}
              >
                <MediaItem
                  id={media.media_id}
                  title={media.title}
                  mediaType={mediaType}
                  posterPath={media.poster_path}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Media>
        <Pagination gridArea="pagination" />
      </Main>
    </Container>
  ) : null;
};

export default MediaList;
