import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    window.location.href = "/movies/latest";
  }
  render() {
    return <Redirect to="/movies/latest" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default {
  component: connect(
    null,
    mapDispatchToProps
  )(Logout)
};
