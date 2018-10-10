import React from "react";
import styles from "./DrawerToggle.scss";

const DrawerToggle = props => {
  return (
    <div onClick={props.clicked} className={styles.drawer}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default DrawerToggle;
