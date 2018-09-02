import React from 'react';
import styled from 'react-emotion';
import { SearchResultForm } from '../types';
import { formLangs } from '../utils';
import {COLORS} from "../constants";

export const Container = styled('li')`
  width: 220px;
  height: 220px;
  font-size: 22px;
  display: flex;
  flex: 0 0 auto;
`;

export const ContainerLink = styled('a')`
  display: flex;
  text-decoration: none;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.PURPLE};
  padding: 4px;
  flex-direction: column;
  box-sizing: border-box;
`;

export const InfoBox = styled('div')`
  background-color: #ffffff;
  padding: 0.4rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled('h3')`
  color: ${COLORS.TEAL};
  text-align: center;
  box-sizing: border-box;
  font-size: 1.2rem;
  margin: 0 0 0.4rem;
  word-wrap: break-word;
`;

export const Description = styled('div')`
  font-size: 0.9rem;
  color: #000000;
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
  max-height: 100px;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background:   linear-gradient(
    to bottom,
    hsla(0, 0%, 100%, 0) 0%,
    hsla(0, 0%, 100%, 0.013) 8.1%,
    hsla(0, 0%, 100%, 0.049) 15.5%,
    hsla(0, 0%, 100%, 0.104) 22.5%,
    hsla(0, 0%, 100%, 0.175) 29%,
    hsla(0, 0%, 100%, 0.259) 35.3%,
    hsla(0, 0%, 100%, 0.352) 41.2%,
    hsla(0, 0%, 100%, 0.45) 47.1%,
    hsla(0, 0%, 100%, 0.55) 52.9%,
    hsla(0, 0%, 100%, 0.648) 58.8%,
    hsla(0, 0%, 100%, 0.741) 64.7%,
    hsla(0, 0%, 100%, 0.825) 71%,
    hsla(0, 0%, 100%, 0.896) 77.5%,
    hsla(0, 0%, 100%, 0.951) 84.5%,
    hsla(0, 0%, 100%, 0.987) 91.9%,
    hsl(0, 0%, 100%) 100%
);

  }
`;

export const Form = styled('div')`
  color: #ffffff;
  text-align: center;
  box-sizing: border-box;
  padding: 0.3rem;
  text-transform: uppercase;
  font-size: 1.1rem;
`;

interface SearchResultItemProps {
  form: SearchResultForm;
  title: string;
  link: string;
  description?: string;
}

export const SearchResultItem: React.SFC<SearchResultItemProps> = ({
  title,
  form,
  description,
  link,
}) => (
  <Container>
    <ContainerLink href={link}>
      <InfoBox>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </InfoBox>
      <Form>{formLangs(form)}</Form>
    </ContainerLink>
  </Container>
);
