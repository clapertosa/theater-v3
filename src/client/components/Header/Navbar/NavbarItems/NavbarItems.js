import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarItem from "./NavbarItem/NavbarItem";
import NavbarDropdownItem from "./NavbarDropdownItem/NavbarDropdownItem";
import SearchBar from "./SearchBar/SearchBar";
import reelIcon from "../../../../../assets/images/reel.svg";
import tvIcon from "../../../../../assets/images/tv.svg";
import userIcon from "../../../../../assets/images/user.svg";
import styles from "./NavbarItems.scss";

class NavbarItems extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className={styles.left}>
          <NavbarDropdownItem icon={reelIcon} shake title="Movies">
            <NavbarItem url="/movies/latest">Latest</NavbarItem>
            <NavbarItem url="/movies/top-rated">Top Rated</NavbarItem>
            <NavbarItem url="/movies/most-voted">Most Voted</NavbarItem>
          </NavbarDropdownItem>
          <NavbarDropdownItem icon={tvIcon} shake title="Series">
            <NavbarItem url="/series/on-the-air">On The Air</NavbarItem>
            <NavbarItem url="/series/top-rated">Top Rated</NavbarItem>
            <NavbarItem url="/series/most-popular">Most Popular</NavbarItem>
          </NavbarDropdownItem>
          <NavbarDropdownItem
            className={styles["mobile-only"]}
            icon={userIcon}
            rotate
            title={
              this.props.isAuthenticated &&
              this.props.user &&
              this.props.user.name &&
              this.props.user.name.length > 0
                ? this.props.user.name.trim()
                : "User"
            }
          >
            {this.props.isAuthenticated ? (
              <React.Fragment>
                <NavbarItem url="/dashboard">Dashboard</NavbarItem>
                <NavbarItem url="/logout">Logout</NavbarItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavbarItem url="/register">Register</NavbarItem>
                <NavbarItem url="/login">Login</NavbarItem>
              </React.Fragment>
            )}
          </NavbarDropdownItem>
        </ul>
        <ul className={styles.right}>
          <li className={styles.searchbar}>
            <SearchBar />
          </li>
          <NavbarDropdownItem
            className={styles["desktop-only"]}
            icon={userIcon}
            rotate
            title={
              this.props.isAuthenticated &&
              this.props.user &&
              this.props.user.name &&
              this.props.user.name.length > 0
                ? this.props.user.name.trim()
                : "User"
            }
          >
            {this.props.isAuthenticated ? (
              <React.Fragment>
                <NavbarItem url="/dashboard">Dashboard</NavbarItem>
                <NavbarItem url="/logout">Logout</NavbarItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavbarItem url="/register">Register</NavbarItem>
                <NavbarItem url="/login">Login</NavbarItem>
              </React.Fragment>
            )}
          </NavbarDropdownItem>
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(NavbarItems);
