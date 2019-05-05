import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { SEARCH_QUERY, CURRENT_USER_QUERY } from "../../../../apollo/queries";
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
        <Item justifyContent="flex-end" width="90%">
          <Searchbar apolloQuery={SEARCH_QUERY} />
        </Item>
        <Query query={CURRENT_USER_QUERY}>
          {({ data: { currentUser } }) => {
            return currentUser ? (
              <DropDownItem
                icon="/static/images/navbar/user.svg"
                title={currentUser.username}
                list={[
                  { title: "Profile", url: "/user/profile" },
                  { title: "Sign Out", url: "/user/signout" }
                ]}
                marginLeft="20px"
              />
            ) : (
              <DropDownItem
                icon="/static/images/navbar/user.svg"
                title="User"
                list={[
                  { title: "Sign In", url: "/user/signin" },
                  { title: "Sign Up", url: "/user/signup" }
                ]}
                marginLeft="20px"
              />
            );
          }}
        </Query>
      </Second>
    </Container>
  );
};

export default NavbarItems;
