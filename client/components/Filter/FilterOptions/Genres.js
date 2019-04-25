import React, { useState, useEffect } from "react";
import { getGenres } from "../../../utils/components/filter";
import SelectorContainer from "./FilterOptionsStyles/Selector/SelectorContainer";
import Title from "./FilterOptionsStyles/Title";
import GenresValuesList from "./FilterOptionsStyles/Genres/GenresValuesList";
import GenresInput from "./FilterOptionsStyles/Genres/GenresInput";

const Genres = ({ mediaType, onValueChange }) => {
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
  }, []);

  useEffect(() => {
    if (mounted) {
      onValueChange({ genres: selectedValues.toString() });
    }
  }, [selectedValues]);

  const closeValuesList = () => {
    if (
      showValues &&
      document.activeElement.id !== "genres-input" &&
      !document.activeElement.className.startsWith("genres-values-list-item") &&
      !document.activeElement.className.startsWith("genres-checkbox-input")
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
    onValueChange({ genres: "" });
    document.querySelector("#genres-input").value = "";
    document
      .querySelectorAll(".genres-checkbox-input")
      .forEach(checkbox => (checkbox.checked = false));
    document.querySelector("#genres-input").focus();
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

export default Genres;
