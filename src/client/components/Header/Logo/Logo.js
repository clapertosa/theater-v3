import React from "react";
import logo from "../../../../assets/images/logo.svg";
import styles from "./Logo.scss";

const Logo = () => {
  return <img className={styles.logo} src={logo} alt="Logo" />;
};

export default Logo;
