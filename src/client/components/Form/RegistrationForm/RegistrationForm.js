import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../../store/actions";
import styles from "./RegistrationForm.scss";
import Button from "../../Button/Button";
import FormInput from "../FormInput/FormInput";

class RegistrationForm extends Component {
  state = {
    nameError: undefined,
    surnameError: undefined,
    emailError: undefined,
    passwordError: undefined,
    passwordConfirmationError: undefined
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      nameError: undefined,
      surnameError: undefined,
      emailError: undefined,
      passwordError: undefined,
      passwordConfirmationError: undefined
    });
    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirmation = e.target.passwordConfirmation.value;
    if (!this.validate(name, surname, email, password, passwordConfirmation)) {
      const formData = { name, surname, email, password, passwordConfirmation };
      this.props.register(formData);
      window.location.href = "/movies/latest";
    }
  };

  validate = (name, surname, email, password, passwordConfirmation) => {
    let error = false;
    let errors = {};
    //Name & Surname Check
    if (name.length > 50 || name.trim().length > 50) {
      error = true;
      errors.nameError = "Name is longer than 50 chars";
    }

    if (surname.length > 50 || surname.trim().length > 50) {
      error = true;
      errors.surnameError = "Surname is longer than 50 chars";
    }

    // Email Check
    if (email.length <= 0 || email.trim() <= 0) {
      error = true;
      errors.emailError = "Email field is required";
    }
    if (
      email.length > 0 &&
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      error = true;
      errors.emailError = "Email is not valid";
    }

    // Password & Password Confirmation Check
    if (password.length < 8 || password.length > 16) {
      error = true;
      errors.passwordError = "Password length must be between 8 and 16 chars";
    }

    if (password.length <= 0) {
      error = true;
      errors.passwordError = "Password field is required";
    }

    if (password !== passwordConfirmation) {
      error = true;
      errors.passwordConfirmationError =
        "Password and confirmation password must be the same";
    }

    if (passwordConfirmation.length <= 0) {
      error = true;
      errors.passwordConfirmationError =
        "Password Confirmation field is required";
    }

    this.setState({ ...errors });

    return error;
  };

  render() {
    if (this.props.isAuthenticated) {
      window.location.href = "/movies/latest";
    }
    return (
      <form
        onSubmit={this.onSubmitHandler}
        method="POST"
        className={styles.container}
      >
        <div className={styles["form-title"]}>
          <h1>Registration</h1>
        </div>
        <div className={styles["form-body"]}>
          <div className={styles["input-container"]}>
            <FormInput
              type="text"
              name="name"
              labelIcon="address-card-o"
              placeholder="Name"
              error={this.state.nameError}
            />
            <FormInput
              type="text"
              name="surname"
              labelIcon="address-card-o"
              placeholder="Surname"
              error={this.state.surnameError}
            />
            <FormInput
              type="email"
              name="email"
              labelIcon="mail"
              placeholder="Email"
              error={this.state.emailError}
            />
            <FormInput
              type="password"
              name="password"
              labelIcon="key"
              placeholder="Password"
              error={this.state.passwordError}
            />
            <FormInput
              type="password"
              name="passwordConfirmation"
              labelIcon="key"
              placeholder="Confirm password"
              error={this.state.passwordConfirmationError}
            />
            {this.props.success !== undefined && !this.props.success ? (
              <span className={styles["error-message"]}>
                {this.props.error}
              </span>
            ) : null}
          </div>
        </div>
        <div className={styles["form-buttons"]}>
          <Button
            type="submit"
            backgroundColor="#0e87e0"
            border="1px solid #0e87e0"
            color="white"
            width="90%"
            height="2rem"
            margin="10px 0"
            cursor="pointer"
            textTransform="uppercase"
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.registration.loading,
    success: state.registration.success,
    error: state.registration.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: formData => dispatch(register(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
