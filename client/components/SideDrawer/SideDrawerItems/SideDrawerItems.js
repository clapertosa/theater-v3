import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { SEARCH_QUERY, CURRENT_USER_QUERY } from "../../../apollo/queries";
import SideDrawerItem from "./SideDrawerItem";
import Searchbar from "../../Searchbar/Searchbar";

const Container = styled.div`
  grid-area: side-drawer-items;
  display: grid;
  grid-template-areas: "searchbar" "discover" "movies" "series" "user";
  grid-template-rows: auto auto auto auto auto;
  margin: 10px auto;
  width: 90%;
`;

const SideDrawerItems = () => {
  return (
    <Container>
      <SideDrawerItem gridArea="searchbar">
        <Searchbar apolloQuery={SEARCH_QUERY} />
      </SideDrawerItem>
      <SideDrawerItem
        gridArea="discover"
        icon="/static/images/navbar/discover.svg"
        title="Discover"
        list={[
          { title: "Movies", url: "/discover/movies" },
          { title: "Series", url: "/discover/series" }
        ]}
      />
      <SideDrawerItem
        gridArea="movies"
        icon="/static/images/navbar/movies.svg"
        title="Movies"
        list={[
          { title: "Popular", url: "/movies/popular" },
          { title: "Top Rated", url: "/movies/top-rated" },
          { title: "Upcoming", url: "/movies/upcoming" },
          { title: "Now Playing", url: "/movies/now-playing" }
        ]}
      />
      <SideDrawerItem
        gridArea="series"
        icon="/static/images/navbar/series.svg"
        title="Series"
        list={[
          { title: "Popular", url: "/series/popular" },
          { title: "Top Rated", url: "/series/top-rated" },
          { title: "On TV", url: "/series/on-tv" },
          { title: "Airing Today", url: "/series/airing-today" }
        ]}
      />
      <Query query={CURRENT_USER_QUERY}>
        {({ data: { currentUser } }) => {
          return currentUser ? (
            <SideDrawerItem
              icon="/static/images/navbar/user.svg"
              title={currentUser.username}
              list={[
                { title: "Profile", url: "/user/profile" },
                { title: "Sign Out", url: "/user/signout" }
              ]}
              marginLeft="20px"
            />
          ) : (
            <SideDrawerItem
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
    </Container>
  );
};

export default SideDrawerItems;
