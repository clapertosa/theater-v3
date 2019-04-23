import React, { useState } from "react";
import styled from "styled-components";
import { withApollo } from "react-apollo";
import { DISCOVER_SERIES_QUERY } from "../apollo/queries";
import Filter from "../components/Filter/Filter";
import Wrapper from "../hoc/Wrapper/Wrapper";
import Cards from "../components/Cards/Cards";
import Pagination from "../components/Pagination/Pagination";

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas: "filter" "results" "pagination";
  grid-template-rows: auto 1fr auto;
`;

const Discover = ({ mediaType, initialData, client }) => {
  const [data, setData] = useState(initialData);
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async (params, page = 1) => {
    setLoading(true);
    setParams(params);
    const res = await client.query({
      query: DISCOVER_SERIES_QUERY,
      variables: {
        page,
        release_year: params.year,
        sort_by: params.sortBy,
        with_genres: params.genres,
        without_genres: params.withoutGenres
      }
    });

    setData(res.data.discoverSeries);
    setLoading(false);
  };

  const onFilterUpdate = values => {
    getData(values, 1);
  };

  const onPageChange = pageNumber => {
    getData(params, pageNumber);
  };

  return (
    <Wrapper>
      <Container>
        <Filter updated={onFilterUpdate} mediaType={mediaType} />
        <Cards
          loading={loading}
          medias={data.results}
          mediaType="tv"
          gridArea="results"
        />
        <Pagination
          loading={loading}
          pageChanged={onPageChange}
          currentPage={data.page}
          totalPages={data.total_pages}
        />
      </Container>
    </Wrapper>
  );
};

export default withApollo(Discover);
