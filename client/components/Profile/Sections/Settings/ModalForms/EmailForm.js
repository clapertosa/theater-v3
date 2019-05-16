import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { CHANGE_EMAIL_MUTATION } from "../../../../../apollo/mutations";
import { CURRENT_USER_QUERY } from "../../../../../apollo/queries";
import ModalHoc from "./ModalHoc";
import { Formik } from "formik";
import { isEmail } from "validator";
import StyledForm from "../../../../Form/StyledFormComponents/StyledForm";
import InputArea from "../../../../Form/StyledFormComponents/InputArea";
import Input from "../../../../Form/StyledFormComponents/Input/Input";
import ButtonArea from "../../../../Form/StyledFormComponents/ButtonArea";
import Button from "../../../../Form/StyledFormComponents/Button";
import Message from "../../../../Form/StyledFormComponents/Message";

const EmailForm = ({ closeModal }) => {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <Mutation
      mutation={CHANGE_EMAIL_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      awaitRefetchQueries
    >
      {(changeEmail, { loading }) => (
        <ModalHoc closeModal={closeModal}>
          <Formik
            initialValues={{ email: "", confirmEmail: "" }}
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
              } else if (values.email !== values.confirmEmail) {
                errors.confirmEmail = "Email and confirm email must be equal";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setServerError("");
              try {
                await changeEmail({
                  variables: {
                    email: values.username,
                    confirmEmail: values.confirmEmail
                  }
                });
                setEmail(values.email.trim().toLowerCase());
                setSuccess(true);
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
                    label="New Email"
                    icon="mail-alt"
                    required
                    name="email"
                    type="email"
                    onChange={e => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email && touched.email && errors.email}
                  />
                  <Input
                    autoCapitalize="none"
                    label="Confirm Email"
                    icon="mail-alt"
                    required
                    name="email"
                    type="email"
                    onChange={e => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.confirmEmail}
                    error={
                      errors.confirmEmail &&
                      touched.confirmEmail &&
                      errors.confirmEmail
                    }
                  />
                </InputArea>
                <Message
                  gridArea="server-message"
                  error={serverError.length > 0}
                >
                  {serverError}
                  {!serverError &&
                    success &&
                    `A new email has been sent to ${email}. Activate and sign-in again`}
                </Message>
                <ButtonArea>
                  <Button type="submit" disabled={isSubmitting || loading}>
                    {loading ? "Submitting" : "Submit"}
                  </Button>
                </ButtonArea>
              </StyledForm>
            )}
          </Formik>
        </ModalHoc>
      )}
    </Mutation>
  );
};

export default EmailForm;
