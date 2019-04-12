import React, { useState, useEffect } from "react";
import { getGenres } from "../../../utils/components/filter";
import SelectorContainer from "./FilterOptionsStyles/Selector/SelectorContainer";
import Title from "./FilterOptionsStyles/Title";
import GenresValuesList from "./FilterOptionsStyles/Genre/GenresValuesList";
import GenresInput from "./FilterOptionsStyles/Genre/GenresInput";

const Genre = ({ mediaType, onValueChange }) => {
  const [values, setValues] = useState(getGenres(mediaType));
  const [selectedValues, setSelectedValues] = useState([]);
  const [showValues, setShowValues] = useState(false);

  useEffect(() => {
    document.addEventListener("click", closeValuesList);
  });

  useEffect(() => {
    onValueChange({ genres: selectedValues });
  }, [selectedValues]);

  const closeValuesList = () => {
    if (
      showValues &&
      document.activeElement.id !== "genre-input" &&
      !document.activeElement.className.startsWith("values-list-item") &&
      !document.activeElement.className.startsWith("checkbox-input")
    ) {
      setShowValues(false);
    }
  };

  const onInputChange = e => {
    setValues(getGenres(mediaType, e.target.value));
    setShowValues(true);
  };

  const onGenresListItemClick = e => {
    const { id, name } = JSON.parse(e.target.value);
    if (e.target.checked) {
      setSelectedValues(selectedValues => [...selectedValues, { id, name }]);
    } else {
      setSelectedValues(selectedValues =>
        selectedValues.filter(value => value.id !== id)
      );
    }
  };

  const showValuesListToggle = () => {
    setShowValues(showValues => !showValues);
  };

  const resetFilter = () => {
    setSelectedValues([]);
    onValueChange({ genres: [] });
    document.querySelector("#genre-input").value = "";
    document
      .querySelectorAll(".checkbox-input")
      .forEach(checkbox => (checkbox.checked = false));
    document.querySelector("#genre-input").focus();
  };

  return (
    <SelectorContainer width="200px">
      <Title resetOption reset={resetFilter}>
        Genres
      </Title>
      <GenresInput clicked={showValuesListToggle} changed={onInputChange} />
      <GenresValuesList
        show={showValues}
        values={values}
        clicked={onGenresListItemClick}
      />
    </SelectorContainer>
  );
};

export default Genre;
