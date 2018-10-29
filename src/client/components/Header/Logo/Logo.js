import React from "react";
import logo from "../../../../assets/images/logo.svg";
import styles from "./Logo.scss";

const Logo = () => {
  return (
    <a href="/">
      <img className={styles.logo} src={logo} alt="Logo" />
    </a>
  );
};

export default Logo;
