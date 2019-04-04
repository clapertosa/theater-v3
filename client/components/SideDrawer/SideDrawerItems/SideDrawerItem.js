import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  display: ${({ title }) => (title ? "grid" : "flex")};
  justify-content: ${({ title }) => (title ? "none" : "center")};
  grid-template-areas: "icon title" ". list";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-column-gap: 10px;
  margin-bottom: 20px;
`;

const Icon = styled.div`
  grid-area: icon;
  display: flex;
  width: 30px;
  height: auto;

  & img {
    width: 100%;
    height: auto;
  }
`;

const Title = styled.h3`
  grid-area: title;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  color: ${({ theme: { colors } }) => colors.red};
`;

const List = styled.ul`
  grid-area: list;
  margin: 0;
  padding: 0;

  li {
    list-style: none;

    a {
      color: ${({ theme: { colors } }) => colors.white};
      text-decoration: underline;
      transition: color 0.3s;
    }

    &:hover {
      a {
        color: ${({ theme: { colors } }) => colors.candy};
      }
    }
  }
`;

const SideDrawerItem = ({ gridArea, icon, title, list, children }) => {
  if (title) {
    return (
      <Container gridArea={gridArea} title={title}>
        <Icon>
          <img src={icon} alt={`${title} icon`} />
        </Icon>
        <Title>{title}</Title>
        <List>
          {list.map((item, index) => (
            <li key={index}>
              <Link href={item.url}>
                <a>{item.title}</a>
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  } else {
    return <Container gridArea={gridArea}>{children}</Container>;
  }
};

export default SideDrawerItem;
