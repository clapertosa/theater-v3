import React from "react";
import styled from "styled-components";
import Backdrop from "../../../../Backdrop/Backdrop";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: ${({ theme: { colors } }) => `1px solid ${colors.green}`};
  box-shadow: 3px 3px 3px black;
  max-width: 350px;
  min-width: 220px;
  transition: all 0.3s;
  z-index: ${({ theme: { zIndex } }) => zIndex.navbar};
`;

const ModalHoc = ({ closeModal, children }) => {
  return (
    <>
      <Container>{children}</Container>
      <Backdrop show clicked={closeModal} />
    </>
  );
};

export default ModalHoc;
