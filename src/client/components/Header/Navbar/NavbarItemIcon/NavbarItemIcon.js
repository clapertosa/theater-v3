import React from "react";
import styles from "./NavbarItemIcon.scss";

const NavbarItemIcon = props => {
  return (
    <img
      className={[
        styles.icon,
        props.shake ? styles.shake : null,
        props.rotate ? styles.rotate : null
      ].join(" ")}
      src={props.icon}
      alt="Navbar item icon"
    />
  );
};

export default NavbarItemIcon;
