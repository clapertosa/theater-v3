import React from "react";
import styled from "styled-components";
import Label from "./Label";
import Message from "../Message";

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-areas: "label" "input" "message";
  grid-template-rows: auto 1fr auto;
  width: 100%;
  margin: 5px 0;
`;

const StyledInput = styled.input`
  grid-area: input;
  margin: 10px 0;
  font-size: 1.2rem;
  width: 100%;
  height: 40px;
  text-indent: 5px;
`;

const Input = ({
  autoCapitalize,
  autoCorrect,
  autoComplete,
  required,
  onChange,
  onBlur,
  label,
  icon,
  type,
  name,
  placeholder,
  value,
  error
}) => {
  return (
    <Container>
      <Label icon={icon} name={label} />
      <StyledInput
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        onChange={onChange}
        required={required}
        onBlur={onBlur}
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        value={value || ""}
      />
      <Message error>{error}</Message>
    </Container>
  );
};

export default Input;
