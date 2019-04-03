import React from "react";
import styled from "styled-components";
import Logo from "../../../Logo/Logo";
import Item from "./Item";
import DropDownItem from "./DropDownItem/DropDownItem";
import Searchbar from "../Searchbar/Searchbar";

const Container = styled.div`
  display: grid;
  grid-template-areas: "sections user";
  margin: auto 20px auto 20px;
  height: inherit;
`;

const Sections = styled.ul`
  grid-area: sections;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const User = styled.ul`
  grid-area: user;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavbarItems = () => {
  return (
    <Container>
      <Sections>
        <Item marginRight="30px">
          <Logo />
        </Item>
        <DropDownItem
          list={[
            { title: "Movies", url: "/discover/movies" },
            { title: "Series", url: "/discover/series" }
          ]}
          marginRight="20px"
          icon="/static/images/navbar/discover.svg"
          title="Discover"
        />
        <DropDownItem
          list={[
            { title: "Popular", url: "/movies/popular" },
            { title: "Top Rated", url: "/movies/top-rated" },
            { title: "Upcoming", url: "/movies/upcoming" },
            { title: "Now Playing", url: "/movies/now-playing" }
          ]}
          marginRight="20px"
          icon="/static/images/navbar/movies.svg"
          title="Movies"
        />
        <DropDownItem
          list={[
            { title: "Popular", url: "/series/popular" },
            { title: "Top Rated", url: "/series/top-rated" },
            { title: "On TV", url: "/series/on-tv" },
            { title: "Airing Today", url: "/series/airing-today" }
          ]}
          marginRight="20px"
          icon="/static/images/navbar/series.svg"
          title="Series"
        />
      </Sections>
      <User>
        <Item width="90%">
          <Searchbar />
        </Item>
        <DropDownItem
          list={[
            { title: "Log in", url: "/user/login" },
            { title: "Sign Up", url: "/user/signup" },
            { title: "Profile", url: "/user/profile" },
            { title: "Log out", url: "/user/logout" }
          ]}
          marginLeft="20px"
          icon="/static/images/navbar/user.svg"
          title="User"
        />
      </User>
    </Container>
  );
};

export default NavbarItems;
