import React from 'react';
import styled from 'react-emotion';
import { SearchResultItem } from './SearchResultItem';
import { getForm } from '../utils';
import {FilterMap} from "../types";

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
  filterMap: FilterMap;
}

export const SearchResults: React.SFC<SearchResultsProps> = ({ data, filterMap }) =>
  !data ? null : (
    <Container>
      <List>
        {data.top.filter((id: string) => filterMap[getForm(data.results[id])]).map((id: string) => (
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
