import React from "react";
import styled from "styled-components";

const ValuesList = styled.ul`
  grid-area: value-list;
  position: absolute;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  max-height: ${({ show }) => (show ? "200px" : "0")};
  scrollbar-color: ${({ theme: { colors } }) => `${colors.gunMetal} silver`};
  scrollbar-width: auto;
  z-index: ${({ theme: { zIndex } }) => zIndex.filter};
  transition: max-height 0.3s ease-out;
`;

const ValuesListItem = styled.li`
  list-style: none;
  color: ${({ theme: { colors } }) => colors.gunMetal};
  background-color: ${({ theme: { colors } }) => colors.white};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ noResults, theme: { colors } }) =>
      noResults ? "" : colors.gray};
  }
`;

const ValueLabel = styled.label`
  cursor: ${({ noResults }) => (noResults ? "normal" : "pointer")};
  display: block;
  padding: 10px 2px;
  width: 100%;
  height: 100%;
  text-align: ${({ noResults }) => (noResults ? "center" : "left")};
`;

const ValueCheckbox = styled.input`
  cursor: pointer;
  margin-right: 10px;
`;

const GenresValuesList = ({ show, values, clicked }) => {
  if (values.length <= 0) {
    return (
      <ValuesList show={show}>
        <ValuesListItem
          noResults
          className="without-genres-values-list-item"
          tabIndex="0"
        >
          <ValueLabel noResults>Genre not found</ValueLabel>
        </ValuesListItem>
      </ValuesList>
    );
  } else {
    return (
      <ValuesList show={show}>
        {values.map((value, index) => (
          <ValuesListItem
            id={value.id}
            className="without-genres-values-list-item"
            tabIndex={index}
            key={value.id}
          >
            <ValueLabel>
              <ValueCheckbox
                autoComplete="off" // Uncheck all values on reload
                className="without-genres-checkbox-input"
                type="checkbox"
                value={value.id}
                onClick={clicked}
              />
              {value.name}
            </ValueLabel>
          </ValuesListItem>
        ))}
      </ValuesList>
    );
  }
};

export default GenresValuesList;
