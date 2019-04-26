import React from "react";
import styled from "styled-components";
import { getAge, convertToLocal } from "../../../../../../utils/moment";
import getZodiacSign from "../../../../../utils/components/zodiacSign";

const Wrapper = styled.div`
  grid-area: technical-info;
  margin: auto;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    margin: 0;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: "label value";
  grid-template-columns: auto 1fr;
  grid-column-gap: 5px;
  margin: 5px 0;
  text-shadow: 3px 3px 3px black;
`;

const Label = styled.span`
  grid-area: label;
  text-transform: capitalize;
  margin: auto;
`;

const Value = styled.span`
  grid-area: value;
  font-weight: normal;
  text-transform: capitalize;
`;

const ZodiacSign = styled.img`
  height: 50px;
  width: auto;
`;

const TechnicalInfo = ({ role, birthday, deathday, gender, placeOfBirth }) => {
  const zodiacSign = birthday ? getZodiacSign(birthday) : null;

  return (
    <Wrapper>
      {role ? (
        <Container>
          <Label>Known for:</Label>
          <Value>{role}</Value>
        </Container>
      ) : null}
      {birthday ? (
        <Container>
          <Label>Born:</Label>
          <Value>
            {`${convertToLocal(birthday)}${
              placeOfBirth ? " in " + placeOfBirth : ""
            }`}
          </Value>
        </Container>
      ) : null}
      {deathday ? (
        <Container>
          <Label>Died:</Label>
          <Value>
            {convertToLocal(deathday)} (age {getAge(birthday, deathday)})
          </Value>
        </Container>
      ) : null}
      {!deathday && birthday ? (
        <Container>
          <Label>Age:</Label>
          <Value>{getAge(birthday)}</Value>
        </Container>
      ) : null}
      {gender !== 0 ? (
        <Container>
          <Label>Gender:</Label>
          <Value>{gender === 1 ? "Female" : "Male"}</Value>
        </Container>
      ) : null}
      {birthday ? (
        <Container>
          <Label>Zodiac Sign:</Label>
          <Value>
            <ZodiacSign
              title={zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)}
              src={`/static/images/zodiac/${zodiacSign}.svg`}
              alt={`${zodiacSign.charAt(0).toUpperCase() +
                zodiacSign.slice(1)}`}
            />
          </Value>
        </Container>
      ) : null}
    </Wrapper>
  );
};

export default TechnicalInfo;
