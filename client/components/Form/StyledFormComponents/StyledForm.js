import React from "react";
import styled from "styled-components";

const Container = styled.form`
  grid-area: form;
  display: grid;
  grid-template-areas: "input-area input-area" "server-message server-message" ". button-area";
  grid-template-columns: 1fr auto;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  padding: 10px 30px;
`;

const StyledForm = ({ children, onSubmit }) => {
  return <Container onSubmit={onSubmit}>{children}</Container>;
};

export default StyledForm;
