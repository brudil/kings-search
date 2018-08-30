import React from 'react';
import styled from 'react-emotion';
import { SearchResultForm } from '../types';
import { formLangs } from '../utils';

export const Container = styled('li')`
  width: 300px;
  font-size: 22px;
  display: flex;
`;

export const ContainerLink = styled('a')`
  display: flex;
  text-decoration: none;
  flex: auto;
`;

export const MetaBox = styled('div')`
  background-color: #502669;
  padding: 4px;
  flex: auto;
`;

export const Title = styled('h3')`
  background-color: #ffffff;
  color: #000000;
  text-align: center;
  box-sizing: border-box;
  padding: 0.3rem;
  margin: 0;
`;

export const Description = styled('div')`
  font-size: 0.8rem;
  background-color: #ffffff;
  color: #000000;
  box-sizing: border-box;
  padding: 0.3rem;
  margin: 0;
`;

export const Form = styled('div')`
  color: #ffffff;
  text-align: center;
  box-sizing: border-box;
  padding: 0.3rem;
  text-transform: uppercase;
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
      <MetaBox>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <Form>{formLangs(form)}</Form>
      </MetaBox>
    </ContainerLink>
  </Container>
);
