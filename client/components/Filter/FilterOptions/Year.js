import React, { useState, useEffect } from "react";
import { getYears } from "../../../utils/components/filter";
import SelectorContainer from "./FilterOptionsStyles/Selector/SelectorContainer";
import Title from "./FilterOptionsStyles/Title";
import Value from "./FilterOptionsStyles/Selector/SelectorValue";
import ValuesList from "./FilterOptionsStyles/Selector/SelectorValuesList";

const Year = ({ onValueChange }) => {
  useEffect(() => {
    document.addEventListener("click", closeValuesList);
  });

  const years = getYears();
  const [value, setValue] = useState(years[1] - 1);
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
    onValueChange({ year: e.target.innerText });
    setShowValues(false);
  };

  return (
    <SelectorContainer>
      <Title>Year</Title>
      <Value
        clicked={onClickHandler}
        blurred={closeValuesList}
        valuesListOpened={showValues}
      >
        {value}
      </Value>
      <ValuesList
        show={showValues}
        values={years}
        clicked={onValueListItemClick}
      />
    </SelectorContainer>
  );
};

export default Year;
