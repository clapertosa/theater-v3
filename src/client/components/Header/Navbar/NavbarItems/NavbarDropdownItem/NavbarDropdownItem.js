import React, { Component } from "react";
import styles from "./NavbarDropdownItem.scss";
import NavbarItemIcon from "../../NavbarItemIcon/NavbarItemIcon";

class NavbarDropdownItem extends Component {
  state = {
    showDropdownList: false
  };

  dropdownToggle = () => {
    this.setState(prevState => {
      return { showDropdownList: !prevState.showDropdownList };
    });
  };

  closeDropdown = () => {
    this.setState({ showDropdownList: false });
  };

  render() {
    return (
      <li className={this.props.className}>
        <button
          onBlur={this.closeDropdown}
          onClick={
            this.state.showDropdownList
              ? this.closeDropdown
              : this.dropdownToggle
          }
          className={styles["dropdown-button"]}
        >
          {this.props.icon ? (
            <NavbarItemIcon
              icon={this.props.icon}
              shake={this.props.shake}
              rotate={this.props.rotate}
            />
          ) : null}{" "}
          <span className={styles.title}>
            {this.props.title.trim().length > 7
              ? this.props.title.trim().substring(0, 7) + "..."
              : this.props.title.trim()}
          </span>
        </button>
        <div
          className={[
            styles["dropdown-container"],
            this.state.showDropdownList ? styles.open : styles.close
          ].join(" ")}
        >
          <ul className={styles["dropdown-list"]}>{this.props.children}</ul>
        </div>
      </li>
    );
  }
}

export default NavbarDropdownItem;
