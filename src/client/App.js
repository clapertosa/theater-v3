import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Navbar from "./components/Header/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { fetchCurrentUser } from "./store/actions";
import "../assets/fonts/fontello/css/fontello.css?raw";
import styles from "./App.scss";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

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
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  };
};

export default {
  component: connect(
    null,
    mapDispatchToProps
  )(App)
};
