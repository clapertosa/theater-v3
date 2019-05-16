import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-areas: "icon content edit";
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 10px;
  margin: 5px auto;
  width: 100%;
`;

const IconArea = styled.div`
  color: ${({ theme: { colors } }) => colors.white};
  grid-area: icon;
  display: flex;
  align-items: center;

  i {
    font-size: 1.5rem;
  }
`;

const ContentArea = styled.div`
  color: ${({ theme: { colors } }) => colors.white};
  grid-area: content;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 3px 3px 3px black;
  width: 100%;
  overflow: auto;

  input {
    width: 100%;
  }
`;

const EditArea = styled.div`
  grid-area: edit;
  display: flex;
  align-items: center;

  i {
    cursor: pointer;
    color: ${({ theme: { colors } }) => colors.white};
    font-size: 1.5rem;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme: { colors } }) => colors.green};
    }
  }
`;

const Field = ({ icon, type, children, clicked }) => {
  return (
    <Container>
      <IconArea>
        <i className={`icon-${icon}`} />
      </IconArea>
      <ContentArea>{children}</ContentArea>
      <EditArea>
        <i
          className="icon-pencil"
          title={`Change ${type}`}
          onClick={() => clicked(type)}
        />
      </EditArea>
    </Container>
  );
};

export default Field;
