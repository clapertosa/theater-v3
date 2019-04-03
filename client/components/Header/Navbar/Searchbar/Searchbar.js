import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 10px;
  width: 100%;
  min-width: 15rem;
`;

const Input = styled.input`
  height: 2rem;
  width: inherit;
  text-indent: 30px;
  font-size: 1.2rem;
`;

const MagnifyingGlass = styled.i`
  position: absolute;
  font-size: 1.5rem;
`;

const Searchbar = () => {
  return (
    <Container>
      <MagnifyingGlass className="icon-search" />
      <Input type="text" placeholder="Search Movies or Series" />
    </Container>
  );
};

export default Searchbar;
