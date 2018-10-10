import React from "react";
import NavbarItems from "../Navbar/NavbarItems/NavbarItems";
import styles from "./SideDrawer.scss";

const SideDrawer = props => {
  let touchStart, touchEnd;

  return (
    <div
      className={[
        styles.container,
        props.showSideDrawer ? styles.open : styles.close
      ].join(" ")}
      onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
      onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
      onTouchEnd={() =>
        touchEnd < touchStart ? props.closeSideDrawer() : null
      }
    >
      <NavbarItems />
    </div>
  );
};

export default SideDrawer;
