import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { CHANGE_PASSWORD_MUTATION } from "../../../../../apollo/mutations";
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

const PasswordForm = ({ closeModal }) => {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <Mutation
      mutation={CHANGE_PASSWORD_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      awaitRefetchQueries
    >
      {(changePassword, { loading }) => (
        <ModalHoc closeModal={closeModal}>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: ""
            }}
            validate={values => {
              // Password checks
              let errors = {};
              if (
                !values.oldPassword ||
                (values.oldPassword && values.oldPassword.trim().length <= 0)
              ) {
                errors.oldPassword = "Required";
              } else if (
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
                await changePassword({
                  variables: {
                    oldPassword: values.oldPassword,
                    password: values.password,
                    confirmPassword: values.confirmPassword
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
                    label="Old Password"
                    icon="key"
                    required
                    name="oldPassword"
                    type="password"
                    onChange={e => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.oldPassword}
                    error={
                      errors.oldPassword &&
                      touched.oldPassword &&
                      errors.oldPassword
                    }
                  />
                  <Input
                    autoCapitalize="none"
                    label="New Password"
                    icon="key"
                    required
                    name="password"
                    type="password"
                    onChange={e => {
                      handleChange(e);
                    }}
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
                    onChange={e => {
                      handleChange(e);
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
                <Message
                  gridArea="server-message"
                  error={serverError.length > 0}
                >
                  {serverError}
                  {!serverError && success && "Password successfully changed"}
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

export default PasswordForm;
