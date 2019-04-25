import React from "react";
import styled from "styled-components";
import DropDownListItem from "./DropDownListItem";

const Container = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  top: ${({ theme: { navbarHeight } }) => navbarHeight};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  max-height: ${({ show }) => (show ? "300px" : 0)};
  overflow: hidden;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  box-shadow: 3px 3px 3px black;
  transition: max-height 0.3s ease-out;
`;

const DropDownList = ({ show, list }) => {
  return (
    <Container show={show}>
      {list.map((item, index) => (
        <DropDownListItem
          key={index}
          index={index}
          title={item.title}
          url={item.url}
        />
      ))}
    </Container>
  );
};

export default DropDownList;
