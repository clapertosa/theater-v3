import React from "react";
import styled from "styled-components";
import { default as CP } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { theme } from "../../hoc/Layout/Layout";

const CircularProgress = ({ gridArea, width, percentage, text }) => {
  const Container = styled.div`
    position: relative;
    grid-area: ${({ gridArea }) => (gridArea ? gridArea : "")};
    width: ${({ width }) => (width ? width : "60px")};
    height: ${({ width }) => (width ? width : "60px")};
  `;

  const Text = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-weight: bold;
    fill: #edf2f4;
    font-size: 20px;

    span {
      font-size: 10px;
    }
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
      <Text>
        {text} <span>%</span>
      </Text>
      <CP
        percentage={percentage || 0}
        // text={text}
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
