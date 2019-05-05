import React from "react";
import styled from "styled-components";

const Container = styled.h1`
  text-align: center;
`;

const Message = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Message;
