import React, { useState, useEffect } from "react";
import { getGenres } from "../../../utils/components/filter";
import SelectorContainer from "./FilterOptionsStyles/Selector/SelectorContainer";
import Title from "./FilterOptionsStyles/Title";
import WithoutGenresValuesList from "./FilterOptionsStyles/WithoutGenres/WithoutGenresValuesList";
import WithoutGenresInput from "./FilterOptionsStyles/WithoutGenres/WithoutGenresInput";

const WithoutGenres = ({ mediaType, onValueChange }) => {
  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState(getGenres(mediaType));
  const [selectedValues, setSelectedValues] = useState([]);
  const [showValues, setShowValues] = useState(false);

  useEffect(() => {
    document.addEventListener("click", closeValuesList);
    return () => {
      document.removeEventListener("click", closeValuesList);
    };
  });

  useEffect(() => {
    setMounted(true);
  });

  useEffect(() => {
    if (mounted) {
      onValueChange({ withoutGenres: selectedValues.toString() });
    }
  }, [selectedValues]);

  const closeValuesList = () => {
    if (
      showValues &&
      document.activeElement.id !== "without-genres-input" &&
      !document.activeElement.className.startsWith(
        "without-genres-values-list-item"
      ) &&
      !document.activeElement.className.startsWith(
        "without-genres-checkbox-input"
      )
    ) {
      setShowValues(false);
    }
  };

  const onInputChange = e => {
    setValues(getGenres(mediaType, e.target.value));
    setShowValues(true);
  };

  const onGenresListItemClick = e => {
    const id = e.target.value;
    if (e.target.checked) {
      setSelectedValues(selectedValues => [...selectedValues, id]);
    } else {
      setSelectedValues(selectedValues =>
        selectedValues.filter(selectedValue => selectedValue !== id)
      );
    }
  };

  const showValuesListToggle = () => {
    setShowValues(showValues => !showValues);
  };

  const resetFilter = () => {
    setSelectedValues([]);
    onValueChange({ withoutGenres: "" });
    document.querySelector("#without-genres-input").value = "";
    document
      .querySelectorAll(".without-genres-checkbox-input")
      .forEach(checkbox => (checkbox.checked = false));
    document.querySelector("#without-genres-input").focus();
  };

  return (
    <SelectorContainer width="200px">
      <Title resetOption reset={resetFilter}>
        W/o genres
      </Title>
      <WithoutGenresInput
        clicked={showValuesListToggle}
        changed={onInputChange}
      />
      <WithoutGenresValuesList
        show={showValues}
        values={values}
        clicked={onGenresListItemClick}
      />
    </SelectorContainer>
  );
};

export default WithoutGenres;
