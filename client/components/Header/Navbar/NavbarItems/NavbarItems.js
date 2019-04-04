import React from "react";
import styled from "styled-components";
import Item from "./Item";
import DropDownItem from "./DropDownItem/DropDownItem";
import Searchbar from "../../../Searchbar/Searchbar";

const Container = styled.div`
  display: none;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    display: grid;
    grid-area: navbar-items;
    grid-template-areas: "first second";
    height: inherit;
  }
`;

const First = styled.ul`
  grid-area: first;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Second = styled.ul`
  grid-area: second;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavbarItems = () => {
  return (
    <Container>
      <First>
        <DropDownItem
          icon="/static/images/navbar/discover.svg"
          title="Discover"
          list={[
            { title: "Movies", url: "/discover/movies" },
            { title: "Series", url: "/discover/series" }
          ]}
          marginRight="20px"
        />
        <DropDownItem
          icon="/static/images/navbar/movies.svg"
          title="Movies"
          list={[
            { title: "Popular", url: "/movies/popular" },
            { title: "Top Rated", url: "/movies/top-rated" },
            { title: "Upcoming", url: "/movies/upcoming" },
            { title: "Now Playing", url: "/movies/now-playing" }
          ]}
          marginRight="20px"
        />
        <DropDownItem
          icon="/static/images/navbar/series.svg"
          title="Series"
          list={[
            { title: "Popular", url: "/series/popular" },
            { title: "Top Rated", url: "/series/top-rated" },
            { title: "On TV", url: "/series/on-tv" },
            { title: "Airing Today", url: "/series/airing-today" }
          ]}
          marginRight="20px"
        />
      </First>
      <Second>
        <Item width="90%">
          <Searchbar />
        </Item>
        <DropDownItem
          icon="/static/images/navbar/user.svg"
          title="User"
          list={[
            { title: "Log in", url: "/user/login" },
            { title: "Sign Up", url: "/user/signup" },
            { title: "Profile", url: "/user/profile" },
            { title: "Log out", url: "/user/logout" }
          ]}
          marginLeft="20px"
        />
      </Second>
    </Container>
  );
};

export default NavbarItems;
