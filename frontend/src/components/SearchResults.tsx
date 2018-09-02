import React from 'react';
import styled from 'react-emotion';
import { SearchResultItem } from './SearchResultItem';
import { getForm } from '../utils';

export const Container = styled('div')`
  font-size: 22px;
`;

export const List = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  
  li {
    margin: 1rem;
  }
`;

interface SearchResultsProps {
  data: any;
}

export const SearchResults: React.SFC<SearchResultsProps> = ({ data }) =>
  !data ? null : (
    <Container>
      <List>
        {data.top.map((id: string) => (
          <SearchResultItem
            key={id}
            title={data.results[id].title}
            link={data.results[id].link}
            description={data.results[id].description}
            form={getForm(data.results[id])}
          />
        ))}
      </List>
    </Container>
  );
