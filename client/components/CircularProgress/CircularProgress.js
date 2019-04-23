import React from "react";
import styled from "styled-components";
import { default as CP } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { theme } from "../../hoc/Layout/Layout";

const CircularProgress = ({ gridArea, width, percentage, text }) => {
  const Container = styled.div`
    grid-area: ${({ gridArea }) => (gridArea ? gridArea : "")};
    width: ${({ width }) => (width ? width : "60px")};
    height: auto;
  `;

  const getPathColor = () => {
    if (percentage >= 70) {
      return "#4be34b";
    } else if (percentage <= 69 && percentage >= 50) {
      return "#dede07";
    } else return "#ff4949";
  };

  return (
    <Container gridArea={gridArea} width={width}>
      <CP
        percentage={percentage}
        text={text}
        initialAnimation
        background
        backgroundPadding={6}
        styles={{
          root: {},
          background: {
            fill: theme.colors.gunMetal
          },
          path: {
            stroke: getPathColor(),
            // Tweak path to use flat or rounded ends:
            strokeLinecap: "round",
            // Tweak transition animation:
            transition: "stroke-dashoffset 0.5s ease 0s"
          },
          trail: {
            stroke: theme.colors.gray,
            fillOpacity: 1,
            fill: theme.colors.gunMetal,
            padding: "10px"
          },
          text: {
            fontWeight: "bold",
            fill: theme.colors.white,
            fontSize: "30px"
          }
        }}
      />
    </Container>
  );
};

export default CircularProgress;
