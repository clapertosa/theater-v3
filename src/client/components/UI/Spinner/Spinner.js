import React from "react";
import styles from "./Spinner.scss";

const Spinner = () => {
  return (
    <div className={styles["lds-ripple"]}>
      <div />
      <div />
    </div>
  );
};

export default Spinner;
