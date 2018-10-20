import React from "react";
import TMDBLogo from "../../../assets/images/TMDB_logo.svg";
import styles from "./Footer.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <a
        href="https://www.themoviedb.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img className={styles.logo} src={TMDBLogo} alt="TMDB logo" />
      </a>
    </div>
  );
};

export default Footer;
