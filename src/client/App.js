import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Navbar from "./components/Header/Navbar/Navbar";
import styles from "./App.scss";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <Navbar />
          </header>
          <main className={styles.main}>
            <Switch>{renderRoutes(this.props.route.routes)}</Switch>
          </main>
          <footer className={styles.footer}>Footer</footer>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default {
  component: connect(mapStateToProps)(App)
};
