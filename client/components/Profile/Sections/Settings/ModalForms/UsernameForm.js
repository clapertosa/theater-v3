import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { CHANGE_USERNAME_MUTATION } from "../../../../../apollo/mutations";
import { CURRENT_USER_QUERY } from "../../../../../apollo/queries";
import ModalHoc from "./ModalHoc";
import { Formik } from "formik";
import { isLength } from "validator";
import StyledForm from "../../../../Form/StyledFormComponents/StyledForm";
import InputArea from "../../../../Form/StyledFormComponents/InputArea";
import Input from "../../../../Form/StyledFormComponents/Input/Input";
import ButtonArea from "../../../../Form/StyledFormComponents/ButtonArea";
import Button from "../../../../Form/StyledFormComponents/Button";
import Message from "../../../../Form/StyledFormComponents/Message";

const UsernameForm = ({ closeModal }) => {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <Mutation
      mutation={CHANGE_USERNAME_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      awaitRefetchQueries
    >
      {(changeUsername, { loading }) => (
        <ModalHoc closeModal={closeModal}>
          <Formik
            initialValues={{ username: "" }}
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
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setServerError("");
              try {
                await changeUsername({
                  variables: {
                    username: values.username
                  }
                });
                setSuccess(true);
                setTimeout(() => closeModal(), 2500);
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
                    label="New Username"
                    icon="user"
                    required
                    name="username"
                    type="text"
                    onChange={e => {
                      handleChange(e);
                      setServerError("");
                      setSuccess(false);
                    }}
                    onBlur={handleBlur}
                    value={values.username}
                    error={
                      errors.username && touched.username && errors.username
                    }
                  />
                </InputArea>
                <Message
                  gridArea="server-message"
                  error={serverError.length > 0}
                >
                  {serverError}
                  {!serverError && success && "Username successfully changed"}
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

export default UsernameForm;
