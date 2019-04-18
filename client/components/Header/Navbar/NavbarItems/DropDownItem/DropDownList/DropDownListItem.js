import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.li`
  list-style: none;
  background-color: ${({ index, theme: { colors } }) =>
    index === 0 ? colors.gunMetal : colors.gray};
  transition: background-color 0.3s;

  & :hover {
    background-color: ${({ theme: { colors } }) => colors.red};
  }

  a {
    font-family: Montserrat-SemiBold;
    font-size: 0.9rem;
    display: block;
    padding: 10px 5px;
    text-decoration: none;
    text-align: center;
    color: ${({ theme: { colors } }) => colors.white};
  }
`;

const DropDownListItem = ({ index, title, url }) => {
  return (
    <Container index={index % 2}>
      <Link href={url}>
        <a>{title}</a>
      </Link>
    </Container>
  );
};

export default DropDownListItem;
