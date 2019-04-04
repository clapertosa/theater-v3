import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.li`
  list-style: none;
  background-color: ${({ background, theme: { colors } }) =>
    background === 0 ? colors.gunMetal : colors.gray};
  transition: background-color 0.3s;

  & :hover {
    background-color: ${({ theme: { colors } }) => colors.red};
  }

  a {
    display: block;
    padding: 10px 5px;
    text-decoration: none;
    text-align: center;
    color: ${({ theme: { colors } }) => colors.white};
  }
`;

const DropDownListItem = ({ background, title, url }) => {
  return (
    <Container background={background % 2}>
      <Link href={url}>
        <a>{title}</a>
      </Link>
    </Container>
  );
};

export default DropDownListItem;
