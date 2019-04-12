import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ApolloConsumer } from "react-apollo";
import { SEARCH_CAST_QUERY } from "../../../apollo/queries";
import debounce from "lodash.debounce";
import Title from "./FilterOptionsStyles/Title";
import CastInput from "./FilterOptionsStyles/Cast/CastInput";
import CastResults from "./FilterOptionsStyles/Cast/CastResults";

const Container = styled.div`
  display: grid;
  grid-template-areas: "title" "input" "results";
  position: relative;
`;

const Cast = ({ onValueChange }) => {
  const [people, setPeople] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.addEventListener("click", closeResults);
  });

  useEffect(() => {
    document.querySelector("#cast-input").value = selectedValue;
  }, [selectedValue]);

  const onChangeHandler = debounce(async (query, client) => {
    if (query.trim().length <= 0) {
      onValueChange({ cast: {} });
      setSelectedValue("");
      return;
    }

    setLoading(true);
    setShowResults(true);
    const res = await client.query({
      query: SEARCH_CAST_QUERY,
      variables: { query }
    });

    setPeople(res.data.searchCast.results);
    setLoading(false);
  }, 1000);

  const showResultsToggle = () => {
    setShowResults(showResults => !showResults);
  };

  const closeResults = () => {
    if (
      showResults &&
      document.activeElement.id !== "cast-input" &&
      !document.activeElement.className.startsWith("cast-item")
    )
      setShowResults(false);
    document.querySelector("#cast-input").value = selectedValue;
  };

  const onResultsItemClick = (id, name) => {
    onValueChange({ cast: { id, name } });
    setSelectedValue(name);
    setShowResults(false);
  };

  const resetFilter = () => {
    onValueChange({ cast: {} });
    document.querySelector("#cast-input").focus();
    setSelectedValue("");
  };

  return (
    <ApolloConsumer>
      {client => (
        <Container>
          <div>
            <Title resetOption reset={resetFilter}>
              Cast
            </Title>
            <CastInput
              clicked={showResultsToggle}
              changed={e => onChangeHandler(e.target.value, client)}
            />
            <CastResults
              clicked={onResultsItemClick}
              showResults={showResults}
              loading={loading}
              results={people}
            />
          </div>
        </Container>
      )}
    </ApolloConsumer>
  );
};

export default Cast;
