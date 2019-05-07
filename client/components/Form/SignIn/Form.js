import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import { SIGNIN_MUTATION } from "../../../apollo/mutations";
import { CURRENT_USER_QUERY } from "../../../apollo/queries";
import { isEmail } from "validator";
import Container from "../StyledFormComponents/StyledContainer";
import Title from "../StyledFormComponents/Title";
import StyledForm from "../StyledFormComponents/StyledForm";
import Input from "../StyledFormComponents/Input/Input";
import InputArea from "../StyledFormComponents/InputArea";
import ButtonArea from "../StyledFormComponents/ButtonArea";
import Button from "../StyledFormComponents/Button";
import Error from "../StyledFormComponents/Error";

const ForgotPassword = styled.a`
  margin-top: 10px;
  text-shadow: 3px 3px 3px black;
  color: ${({ theme: { colors } }) => colors.white};
`;

const Form = () => {
  const [serverError, setServerError] = useState("");

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      awaitRefetchQueries
    >
      {(signIn, { loading }) => (
        <Container>
          <Title>Sign In</Title>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={values => {
              let errors = {};
              // Email checks
              if (
                !values.email ||
                (values.email && values.email.trim().length <= 0)
              ) {
                errors.email = "Required";
              } else if (!isEmail(values.email)) {
                errors.email = "Invalid email address";
              }
              // Password checks
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setServerError("");
              try {
                await signIn({
                  variables: { email: values.email, password: values.password }
                });
                // Redirect to homepage
                window.location.href = "/";
              } catch (e) {
                setServerError(e.graphQLErrors[0].message);
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <StyledForm onSubmit={handleSubmit}>
                <InputArea>
                  <Input
                    autoCapitalize="none"
                    label="Email"
                    icon="mail-alt"
                    required
                    name="email"
                    type="email"
                    onChange={e => {
                      handleChange(e);
                      setServerError("");
                    }}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email && touched.email && errors.email}
                  />
                  <Input
                    label="Password"
                    icon="key"
                    required
                    name="password"
                    type="password"
                    onChange={e => {
                      handleChange(e);
                      setServerError("");
                    }}
                    onBlur={handleBlur}
                    value={values.password}
                    error={
                      errors.password && touched.password && errors.password
                    }
                  />
                </InputArea>
                <Error gridArea="server-error">{serverError}</Error>
                <ButtonArea>
                  <Button type="submit" disabled={isSubmitting || loading}>
                    {loading ? "Submitting" : "Sign In"}
                  </Button>
                  <Link href="/user/new-password" passHref>
                    <ForgotPassword>Forgot your password</ForgotPassword>
                  </Link>
                </ButtonArea>
              </StyledForm>
            )}
          </Formik>
        </Container>
      )}
    </Mutation>
  );
};

export default Form;
