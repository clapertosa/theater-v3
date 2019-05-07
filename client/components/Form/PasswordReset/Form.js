import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { RESET_PASSWORD_MUTATION } from "../../../apollo/mutations";
import { Formik } from "formik";
import { isLength } from "validator";
import Container from "../StyledFormComponents/StyledContainer";
import Title from "../StyledFormComponents/Title";
import StyledForm from "../StyledFormComponents/StyledForm";
import InputArea from "../StyledFormComponents/InputArea";
import ButtonArea from "../StyledFormComponents/ButtonArea";
import Input from "../StyledFormComponents/Input/Input";
import Button from "../StyledFormComponents/Button";
import FloatingMessage from "../StyledFormComponents/FloatingMessage";

const Form = ({ token }) => {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  return (
    <Mutation mutation={RESET_PASSWORD_MUTATION}>
      {(resetPassword, { loading }) => (
        <>
          <Container blur={success}>
            <Title>Reset Password</Title>
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validate={values => {
                let errors = {};
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
                try {
                  await resetPassword({
                    variables: {
                      token,
                      password: values.password,
                      confirmPassword: values.confirmPassword
                    }
                  });
                  setSuccess(true);
                  setTimeout(
                    () => (window.location.href = "/user/signin"),
                    3000
                  );
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
                      label="Password"
                      icon="key"
                      required
                      name="password"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={
                        errors.password && touched.password && errors.password
                      }
                    />
                    <Input
                      autoCapitalize="none"
                      label="Confirm Password"
                      icon="key"
                      required
                      name="confirmPassword"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      error={
                        errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword
                      }
                    />
                  </InputArea>
                  <ButtonArea>
                    <Button
                      type="submit"
                      disabled={isSubmitting || loading || success}
                    >
                      Submit
                    </Button>
                  </ButtonArea>
                </StyledForm>
              )}
            </Formik>
          </Container>
          <FloatingMessage
            show={success || serverError.length > 0}
            error={serverError.length > 0}
          >
            {success
              ? "Password successfully changed! You will be now redirected to Sign In page."
              : serverError}
          </FloatingMessage>
        </>
      )}
    </Mutation>
  );
};

export default Form;
