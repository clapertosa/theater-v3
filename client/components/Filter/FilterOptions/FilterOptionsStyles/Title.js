import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: title;
  display: ${({ resetOption }) => (resetOption ? "grid" : "block")};
  grid-template-areas: ${({ resetOption }) =>
    resetOption ? '"title reset-option"' : ""};
  grid-template-columns: 1fr auto;
  width: 100%;
  margin: 10px auto;
  padding: 0;
`;

const Text = styled.h4`
  grid-area: title;
  padding: 0;
  margin: 0;
`;

const ResetIcon = styled.div`
  grid-area: reset-option;
  cursor: pointer;
  text-align: right;
  font-style: italic;
`;

const Title = ({ children, resetOption, reset }) => {
  return (
    <Container resetOption={resetOption}>
      <Text>{children}</Text>
      {resetOption ? (
        <ResetIcon onClick={reset}>
          reset
          <i className="icon-cancel" />
        </ResetIcon>
      ) : null}
    </Container>
  );
};

export default Title;
