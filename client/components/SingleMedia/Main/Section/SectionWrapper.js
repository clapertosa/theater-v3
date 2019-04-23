import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  margin: 20px auto;
  width: 100%;
  display: ${({ show }) => (show ? "grid" : "none")};
  grid-template-areas: ${({ options }) =>
    options ? '"title" "options" "content"' : '"title" "content"'};
`;

const Title = styled.h2`
  grid-area: title;
  margin: 0 0 10px 0;
  text-shadow: 3px 3px 3px black;
`;

const Options = styled.div`
  grid-area: options;
  display: grid;
  grid-template-areas: "option1 option2";
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  min-width: 0;
  min-height: 195px;
  grid-area: content;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  padding: 20px;
  border: ${({ theme: { colors } }) => `1px solid ${colors.white}`};
  border-radius: 5px;
`;

const SectionWrapper = ({ show, gridArea, options, title, children }) => {
  return (
    <Container show={show} gridArea={gridArea} options={options}>
      <Title>{title}</Title>
      {options ? (
        <Options>
          {options[0]}
          {options[1]}
        </Options>
      ) : null}
      <Content>{children}</Content>
    </Container>
  );
};

export default SectionWrapper;
