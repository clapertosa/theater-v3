import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SideDrawer from "../SideDrawer/SideDrawer";
import NavbarItems from "./NavbarItems/NavbarItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import styles from "./Navbar.scss";

class Navbar extends Component {
  state = {
    showSideDrawer: false,
    pathname: null
  };

  componentDidMount = () => {
    this.setState({ pathname: this.props.location.pathname });
  };

  componentDidUpdate = () => {
    if (this.props.location.pathname !== this.state.pathname) {
      this.closeSideDrawer();
      this.setState({ pathname: this.props.location.pathname });
    }
  };

  onDrawerClick = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  onBackdropClick = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: false
      };
    });
  };

  closeSideDrawer = () => {
    this.state.showSideDrawer ? this.setState({ showSideDrawer: false }) : null;
  };

  render() {
    return (
      <React.Fragment>
        <nav>
          <Logo />
          <div className={styles.items}>
            <NavbarItems />
          </div>
          <DrawerToggle clicked={this.onDrawerClick} />
        </nav>
        <SideDrawer
          showSideDrawer={this.state.showSideDrawer}
          closeSideDrawer={this.closeSideDrawer}
        />
        <Backdrop
          clicked={this.onBackdropClick}
          closeSideDrawer={this.closeSideDrawer}
          showBackdrop={this.state.showSideDrawer}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
