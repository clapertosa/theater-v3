import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SideDrawer from "../SideDrawer/SideDrawer";
import NavbarItems from "./NavbarItems/NavbarItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import styles from "./Navbar.scss";

class Navbar extends Component {
  componentDidMount = () => {
    this.setState({ location: this.props.location });
  };

  componentDidUpdate = () => {
    if (this.props.location !== this.state.location) {
      this.closeSideDrawer();
      this.setState({ location: this.props.location });
    }
  };

  state = {
    showSideDrawer: false,
    location: null
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
