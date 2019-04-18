import React from "react";
import { default as CP } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { theme } from "../../hoc/Layout/Layout";

const CircularProgress = ({ percentage, text }) => {
  const getPathColor = () => {
    if (percentage >= 70) {
      return "#4be34b";
    } else if (percentage <= 69 && percentage >= 50) {
      return "#dede07";
    } else return "#ff4949";
  };

  return (
    <CP
      percentage={percentage}
      text={text}
      initialAnimation
      styles={{
        root: {},
        path: {
          stroke: getPathColor(),
          // Tweak path to use flat or rounded ends:
          strokeLinecap: "round",
          // Tweak transition animation:
          transition: "stroke-dashoffset 0.5s ease 0s"
        },
        trail: {
          stroke: theme.colors.gray
        },
        text: { fontWeight: "bold", fill: theme.colors.white, fontSize: "30px" }
      }}
    />
  );
};

export default CircularProgress;
