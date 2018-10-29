import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate, authenticationReset } from "../../../store/actions";
import styles from "./LoginForm.scss";
import Button from "../../Button/Button";
import FormInput from "../FormInput/FormInput";

class LoginForm extends Component {
  state = {
    emailError: undefined,
    passwordError: undefined
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.props.authenticationReset();
    this.setState({ emailError: undefined, passwordError: undefined });
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!this.validate(email, password)) {
      this.props.authenticate(email, password);
    }
  };

  validate = (email, password) => {
    let error = false;
    let errors = {};
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

    // Password Check
    if (password.length <= 0) {
      error = true;
      errors.passwordError = "Password field is required";
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
          <h1>Login</h1>
        </div>
        <div className={styles["form-body"]}>
          <div className={styles["input-container"]}>
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
            {this.props.success !== undefined && !this.props.success ? (
              <span className={styles["error-message"]}>
                Email or password wrong
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
    loading: state.auth.loading,
    success: state.auth.success,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (email, password) => dispatch(authenticate(email, password)),
    authenticationReset: () => dispatch(authenticationReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
