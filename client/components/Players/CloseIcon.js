import React from "react";
import styled from "styled-components";

const Container = styled.i`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  color: ${({ theme: { colors } }) => colors.white};
  font-size: 3rem;
  z-index: 9999;
`;

const CloseIcon = ({ closePlayer }) => {
  return <Container onClick={closePlayer} className="icon-cancel" />;
};

export default CloseIcon;
