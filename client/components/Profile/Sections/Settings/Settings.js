import React, { useState } from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Avatar from "./Avatar";
import Fields from "./Fields";
import UsernameForm from "./ModalForms/UsernameForm";
import EmailForm from "./ModalForms/EmailForm";
import PasswordForm from "./ModalForms/PasswordForm";

const Wrapper = styled.div`
  position: relative;
  width: 95%;
  margin: 20px auto;
`;

const Title = styled.h2`
  margin: 0 auto 20px auto;
  max-width: 400px;
  text-shadow: 3px 3px 3px black;
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: "avatar" "fields";
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  border: ${({ theme: { colors } }) => `1px solid ${colors.green}`};
  box-shadow: 3px 3px 3px black;
`;

const Settings = () => {
  const [displayedForm, setDisplayedForm] = useState("none");

  const onEditClickHandler = form => {
    setDisplayedForm(form.toLowerCase());
  };

  const closeModal = () => {
    setDisplayedForm("none");
  };

  return (
    <Wrapper>
      <Title>Profile Settings</Title>
      <Container>
        <Avatar />
        <Fields clicked={onEditClickHandler} />
        <TransitionGroup component={null}>
          {displayedForm === "username" ? (
            <CSSTransition classNames="fade" timeout={300}>
              <UsernameForm closeModal={closeModal} />
            </CSSTransition>
          ) : null}
          {displayedForm === "email" ? (
            <CSSTransition classNames="fade" timeout={300}>
              <EmailForm closeModal={closeModal} />
            </CSSTransition>
          ) : null}
          {displayedForm === "password" ? (
            <CSSTransition classNames="fade" timeout={300}>
              <PasswordForm closeModal={closeModal} />
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </Container>
    </Wrapper>
  );
};

export default Settings;
