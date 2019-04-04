import React from "react";
import styled from "styled-components";
import ResultsItem from "./ResultsItem";

const Container = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  height: 60vh;
  width: inherit;
  background-color: ${({ theme: { colors } }) => colors.gunMetal};
  border: ${({ theme: { colors } }) => `1px solid ${colors.red}`};
  overflow: auto;
  box-shadow: 3px 3px 3px black;
`;

const Results = ({ showResults, results }) => {
  return (
    <Container show={showResults}>
      {results.map((item, index) => (
        <ResultsItem
          key={index}
          background={index}
          title={item.title}
          image={item.image}
        />
      ))}
      <ResultsItem
        title="Meet Joe Black (2001)"
        image="https://www.pastposters.com/cw3/assets/product_full/JamieR/meet-joe-black-cinema-one-sheet-movie-poster-(1).jpg"
      />
      <ResultsItem
        title="Meet Joe Black (2001) aisdojas 32 if3aos asiod iajsdioa asiuo dnasjidj aiso dijaisjd jiajsd asjdiasjdi"
        image="https://www.pastposters.com/cw3/assets/product_full/JamieR/meet-joe-black-cinema-one-sheet-movie-poster-(1).jpg"
      />
      <ResultsItem
        title="Meet Joe Black (2001)"
        image="https://www.pastposters.com/cw3/assets/product_full/JamieR/meet-joe-black-cinema-one-sheet-movie-poster-(1).jpg"
      />
      <ResultsItem
        title="Meet Joe Black (2001)"
        image="https://www.pastposters.com/cw3/assets/product_full/JamieR/meet-joe-black-cinema-one-sheet-movie-poster-(1).jpg"
      />
      <ResultsItem
        title="Meet Joe Black (2001)"
        image="https://www.pastposters.com/cw3/assets/product_full/JamieR/meet-joe-black-cinema-one-sheet-movie-poster-(1).jpg"
      />
      <ResultsItem
        title="Meet Joe Black (2001)"
        image="https://www.pastposters.com/cw3/assets/product_full/JamieR/meet-joe-black-cinema-one-sheet-movie-poster-(1).jpg"
      />
      <ResultsItem
        title="Meet Joe Black (2001)"
        image="https://www.pastposters.com/cw3/assets/product_full/JamieR/meet-joe-black-cinema-one-sheet-movie-poster-(1).jpg"
      />
      <ResultsItem
        title="Meet Joe Black (2001)"
        image="https://www.pastposters.com/cw3/assets/product_full/JamieR/meet-joe-black-cinema-one-sheet-movie-poster-(1).jpg"
      />
      <ResultsItem
        title="Meet Joe Black (2001)"
        image="https://www.pastposters.com/cw3/assets/product_full/JamieR/meet-joe-black-cinema-one-sheet-movie-poster-(1).jpg"
      />
    </Container>
  );
};

export default Results;
