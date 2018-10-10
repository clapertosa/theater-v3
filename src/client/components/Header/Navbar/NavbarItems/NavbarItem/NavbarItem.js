import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavbarItem.scss";

const NavbarItem = props => {
  return (
    <li>
      <NavLink to={props.url}>{props.children}</NavLink>
    </li>
  );
};

export default NavbarItem;
