import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../../../../apollo/queries";
import Field from "./Field";

const Container = styled.div`
  margin: 5px auto;
  display: flex;
  flex-flow: column;
`;

const Fields = ({ clicked }) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data: { currentUser } }) => (
        <Container>
          <Field icon="user" type="Username" clicked={clicked}>
            <span>{currentUser.username}</span>
          </Field>
          <Field icon="mail-alt" type="Email" clicked={clicked}>
            <span>{currentUser.email}</span>
          </Field>
          <Field icon="key" type="Password" clicked={clicked}>
            <span>****</span>
          </Field>
        </Container>
      )}
    </Query>
  );
};

export default Fields;
