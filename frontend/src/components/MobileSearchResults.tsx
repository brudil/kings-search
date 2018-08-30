import React from 'react';
import { SearchResultItem } from './SearchResultItem';
import { Container } from './SearchResults';
import styled from 'react-emotion';
import { getForm } from '../utils';

const HList = styled('ul')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  overflow-x: scroll;
  
  li {
    margin-right: 1rem;
  }
`;

interface MobileSearchResultsProps {
  data: any;
}

const itemRenderer = (data: any, id: string) => (
  <SearchResultItem
    key={id}
    title={data.data.results[id].title}
    link={data.data.results[id].link}
    description={data.data.results[id].description}
    form={getForm(data.data.results[id])}
  />
);

export const MobileSearchResults: React.SFC<MobileSearchResultsProps> = ({
  data,
}) => {
  if (!data) {
    return null;
  }

  return (
    <div>
      <Container>
        <div>
          <h2>Top results</h2>
          <HList>{data.data.top.map(itemRenderer.bind(null, data))}</HList>
        </div>
        <div>
          <h2>Pages</h2>
          <HList>{data.data.pages.map(itemRenderer.bind(null, data))}</HList>
        </div>
        <div>
          <h2>Student Groups</h2>
          <HList>{data.data.groups.map(itemRenderer.bind(null, data))}</HList>
        </div>
        <div>
          <h2>Events</h2>
          <HList>{data.data.events.map(itemRenderer.bind(null, data))}</HList>
        </div>
        <div>
          <h2>News</h2>
          <HList>{data.data.news.map(itemRenderer.bind(null, data))}</HList>
        </div>
      </Container>
    </div>
  );
};
