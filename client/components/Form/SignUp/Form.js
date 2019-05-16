import React, { useState } from "react";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import { SIGNUP_MUTATION } from "../../../apollo/mutations";
import { isLength, isEmail } from "validator";
import Container from "../StyledFormComponents/StyledContainer";
import Title from "../StyledFormComponents/Title";
import StyledForm from "../StyledFormComponents/StyledForm";
import Input from "../StyledFormComponents/Input/Input";
import InputArea from "../StyledFormComponents/InputArea";
import ButtonArea from "../StyledFormComponents/ButtonArea";
import Button from "../StyledFormComponents/Button";
import Message from "../StyledFormComponents/Message";
import FloatingMessage from "../../FloatingMessage/FloatingMessage";

const Form = () => {
  const [serverError, setServerError] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <Mutation mutation={SIGNUP_MUTATION}>
      {(signUp, { loading }) => (
        <>
          <Container blur={success}>
            <Title>Sign Up</Title>
            <Formik
              initialValues={{
                username: "",
                email: "",
                confirmEmail: "",
                password: "",
                confirmPassword: ""
              }}
              validate={values => {
                let errors = {};
                // Username checks
                if (
                  !values.username ||
                  (values.username && values.username.trim().length <= 0)
                ) {
                  errors.username = "Required";
                } else if (!isLength(values.username, { min: 4, max: 16 })) {
                  errors.username =
                    "Username must be between 4 and 16 characters";
                } else if (values.username !== values.username.toLowerCase()) {
                  errors.username = "Username must be lowercase";
                }
                // Email checks
                if (
                  !values.email ||
                  (values.email && values.email.trim().length <= 0)
                ) {
                  errors.email = "Required";
                } else if (!isEmail(values.email)) {
                  errors.email = "Invalid email address";
                } else if (values.email !== values.confirmEmail) {
                  errors.confirmEmail = "Email and confirm email must be equal";
                }
                // Password checks
                if (
                  !values.password ||
                  (values.password && values.password.trim().length <= 0)
                ) {
                  errors.password = "Required";
                } else if (!isLength(values.password, { min: 8, max: 16 })) {
                  errors.password =
                    "Password must be between 8 and 16 characters";
                } else if (values.password !== values.confirmPassword) {
                  errors.confirmPassword =
                    "Password and confirm password must be equal";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setServerError("");
                try {
                  await signUp({
                    variables: {
                      username: values.username,
                      email: values.email,
                      confirmEmail: values.confirmEmail,
                      password: values.password,
                      confirmPassword: values.confirmPassword
                    }
                  });
                  // Registration succeeded
                  setEmail(values.email.trim().toLowerCase());
                  setSuccess(true);
                  // Redirect to homepage in 2.5s
                  setTimeout(() => (window.location.href = "/"), 2500);
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
                      autoComplete="off"
                      label="Username (lowercase)"
                      icon="user"
                      required
                      name="username"
                      type="text"
                      onChange={e => {
                        handleChange(e);
                        setServerError("");
                      }}
                      onBlur={handleBlur}
                      value={values.username}
                      error={
                        errors.username && touched.username && errors.username
                      }
                    />
                    <Input
                      autoCapitalize="none"
                      autoComplete="off"
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
                      autoCapitalize="none"
                      autoComplete="off"
                      label="Confirm Email"
                      icon="mail-alt"
                      required
                      name="confirmEmail"
                      type="email"
                      onChange={e => {
                        handleChange(e);
                        setServerError("");
                      }}
                      onBlur={handleBlur}
                      value={values.confirmEmail}
                      error={
                        errors.confirmEmail &&
                        touched.confirmEmail &&
                        errors.confirmEmail
                      }
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
                    <Input
                      label="Confirm Password"
                      icon="key"
                      required
                      name="confirmPassword"
                      type="password"
                      onChange={e => {
                        handleChange(e);
                        setServerError("");
                      }}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      error={
                        errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword
                      }
                    />
                  </InputArea>
                  <Message gridArea="server-message" error>
                    {serverError}
                  </Message>
                  <ButtonArea>
                    <Button
                      type="submit"
                      disabled={isSubmitting || loading || success}
                    >
                      {loading ? "Submitting" : "Sign Up"}
                    </Button>
                  </ButtonArea>
                </StyledForm>
              )}
            </Formik>
          </Container>
          <FloatingMessage show={success}>
            Success! An email has been sent to {email}
          </FloatingMessage>
        </>
      )}
    </Mutation>
  );
};

export default Form;
