import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: favorite;
  display: grid;
  grid-template-areas: "icon text";
  grid-template-columns: auto 1fr;
  grid-column-gap: 5px;
  margin: auto;

  i {
    grid-area: icon;
    text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff,
      1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
    color: red;
    font-size: 4rem;
    &::before {
      margin-right: 0;
      text-align: left;
    }
  }

  span {
    grid-area: text;
    margin: auto 0 auto 0;
    text-shadow: 3px 3px 3px black;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: auto 0;
  }
`;

const Favorite = () => {
  return (
    <Container>
      <i className="icon-heart-filled" />
      <span>Add to Favorites</span>
    </Container>
  );
};

export default Favorite;
