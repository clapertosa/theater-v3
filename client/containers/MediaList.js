import React, { useState } from "react";
import styled from "styled-components";
import { withApollo } from "react-apollo";
import Wrapper from "../hoc/Wrapper/Wrapper";
import Cards from "../components/Cards/Cards";
import Pagination from "../components/Pagination/Pagination";

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas: "results" "pagination";
  grid-template-rows: 1fr auto;
`;

const MediaList = ({ mediaType, initialData, client, query }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const getData = async (page = 1) => {
    setLoading(true);
    const res = await client.query({
      query,
      variables: {
        page,
        media_type: mediaType
      }
    });

    setData(res.data[Object.keys(res.data)[0]]);
    setLoading(false);
  };

  const onPageChange = pageNumber => {
    getData(pageNumber);
  };

  return (
    <Wrapper>
      <Container>
        <Cards
          loading={loading}
          medias={data.results}
          mediaType={mediaType}
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

export default withApollo(MediaList);
