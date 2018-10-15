import React from "react";
import styles from "./NavbarItem.scss";

const NavbarItem = props => {
  return (
    <li>
      <a href={props.url}>{props.children}</a>
    </li>
  );
};

export default NavbarItem;
