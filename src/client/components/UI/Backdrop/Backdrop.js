import React from "react";
import styles from "./Backdrop.scss";

const Backdrop = props => {
  let touchStart, touchEnd;

  return (
    <div
      onClick={props.clicked}
      className={[
        styles.backdrop,
        props.showBackdrop ? styles.show : styles.hide
      ].join(" ")}
      onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
      onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
      onTouchEnd={() =>
        touchEnd < touchStart ? props.closeSideDrawer() : null
      }
    >
      {props.children}
    </div>
  );
};

export default Backdrop;
