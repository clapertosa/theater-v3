import React, { useState } from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Menu from "../components/Profile/Menu";
import Favorites from "../components/Profile/Sections/Favorites/Favorites";

const Container = styled.div`
  display: grid;
  grid-template-areas: "menu" "content";
`;

const UserProfile = ({ user }) => {
  const [currentSection, setCurrentSection] = useState("favorites");

  const changeSection = section => {
    setCurrentSection(section);
  };

  return (
    <Container>
      <Menu clicked={changeSection} activeSection={currentSection} />
      <TransitionGroup component={null}>
        {currentSection === "favorites" ? (
          <CSSTransition classNames="fade" timeout={300} exit={null}>
            <Favorites />
          </CSSTransition>
        ) : null}
        {currentSection === "settings" ? (
          <CSSTransition classNames="fade" timeout={300} exit={null}>
            <div>Settings page</div>
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </Container>
  );
};

export default UserProfile;
