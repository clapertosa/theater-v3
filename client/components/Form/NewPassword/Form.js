import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { NEW_PASSWORD_MUTATION } from "../../../apollo/mutations";
import { Formik } from "formik";
import { isEmail } from "validator";
import Container from "../StyledFormComponents/StyledContainer";
import Title from "../StyledFormComponents/Title";
import StyledForm from "../StyledFormComponents/StyledForm";
import InputArea from "../StyledFormComponents/InputArea";
import ButtonArea from "../StyledFormComponents/ButtonArea";
import Input from "../StyledFormComponents/Input/Input";
import Button from "../StyledFormComponents/Button";
import FloatingMessage from "../../FloatingMessage/FloatingMessage";

const Form = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <Mutation mutation={NEW_PASSWORD_MUTATION}>
      {(newPassword, { loading }) => (
        <>
          <Container blur={success}>
            <Title>Reset Password</Title>
            <Formik
              initialValues={{ email: "" }}
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
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await newPassword({
                    variables: { email: values.email }
                  });
                  setSuccess(true);
                  setEmail(values.email);
                } catch (e) {
                  // Even if the email doesn't exist in the DB
                  setSuccess(true);
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={errors.email && touched.email && errors.email}
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
          <FloatingMessage show={success}>
            Thanks! An email has been sent to {email} for password reset
            procedure
          </FloatingMessage>
        </>
      )}
    </Mutation>
  );
};

export default Form;
