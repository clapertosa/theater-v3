import React, { useState, useEffect } from "react";
import { getSortValues } from "../../../utils/components/filter";
import SelectorContainer from "./FilterOptionsStyles/Selector/SelectorContainer";
import Title from "./FilterOptionsStyles/Title";
import Value from "./FilterOptionsStyles/Selector/SelectorValue";
import ValuesList from "./FilterOptionsStyles/Selector/SelectorValuesList";

const SortBy = ({ mediaType, onValueChange }) => {
  useEffect(() => {
    document.addEventListener("click", closeValuesList);
  });

  const sortValues = getSortValues(mediaType);
  const [value, setValue] = useState(sortValues[0]);
  const [showValues, setShowValues] = useState(false);

  const onClickHandler = () => {
    setShowValues(show => !show);
  };

  const closeValuesList = () => {
    if (showValues && !document.activeElement.className.startsWith("value")) {
      setShowValues(false);
    }
  };

  const onValueListItemClick = e => {
    setValue(e.target.innerText);
    onValueChange({ sortedBy: e.target.innerText });
    setShowValues(false);
  };

  return (
    <SelectorContainer>
      <Title>Sort By</Title>
      <Value
        clicked={onClickHandler}
        blurred={closeValuesList}
        valuesListOpened={showValues}
      >
        {value}
      </Value>
      <ValuesList
        show={showValues}
        values={sortValues}
        clicked={onValueListItemClick}
      />
    </SelectorContainer>
  );
};

export default SortBy;
