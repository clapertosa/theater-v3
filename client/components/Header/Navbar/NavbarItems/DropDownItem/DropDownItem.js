import React, { useState } from "react";
import styled from "styled-components";
import DropDownList from "./DropDownList/DropDownList";

const Container = styled.li`
  cursor: pointer;
  list-style: none;
  position: relative;
  display: grid;
  grid-template-areas: "icon title";
  grid-column-gap: 5px;
  height: 100%;
  align-items: center;
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
`;

const Icon = styled.div`
  grid-area: icon;
  height: ${({ theme: { navbarHeight } }) => `calc(${navbarHeight} - 1.6rem)`};

  & img {
    height: 100%;
    width: auto;
  }
`;

const Title = styled.div`
  grid-area: title;
  display: flex;
  align-items: center;
  height: 100%;
  color: white;
  font-size: 0.8rem;

  & h3 {
    margin: 0;
    padding: 0;
  }
`;

const DropDownItem = ({ list, marginLeft, marginRight, icon, title }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownToggle = () => {
    setShowDropDown(!showDropDown);
  };

  const openDropDown = () => {
    setShowDropDown(true);
  };

  const closeDropDown = () => {
    setShowDropDown(false);
  };

  return (
    <Container
      className="dropdown"
      onMouseEnter={openDropDown}
      onClick={dropDownToggle}
      onMouseLeave={closeDropDown}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      <Icon>
        <img src={icon} alt={`${title} icon`} />
      </Icon>
      <Title>
        <h3>{title}</h3> <i className="icon-down-open-big" />
      </Title>
      <DropDownList show={showDropDown} list={list} />
    </Container>
  );
};

export default DropDownItem;
