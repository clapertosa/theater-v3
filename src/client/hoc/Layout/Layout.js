import React, { Component } from "react";
import { connect } from "react-redux";
import { test } from "../../store/actions";

class Layout extends Component {
  render() {
    return (
      <div>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

const loadData = store => {
  console.log("TEST");
};

const mapDispatchToProps = dispatch => {
  return {
    test: () => dispatch(test())
  };
};

connect(
  null,
  mapDispatchToProps
)(Layout);

export default Layout;
