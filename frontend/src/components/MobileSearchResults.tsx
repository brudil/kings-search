import React from 'react';
import { SearchResultItem } from './SearchResultItem';
import { Container } from './SearchResults';
import styled from 'react-emotion';
import { getForm } from '../utils';
import { COLORS } from '../constants';

const AreaTitle = styled('h2')`
  text-align: left;
  font-size: 1rem;
  color: ${COLORS.GREY};
`;

const HLContainer = styled('div')`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 80px;
    pointer-events: none;
    background: linear-gradient(
      to right,
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

const HList = styled('ul')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  margin: 0;
  position: relative;
  padding: 0;

  li {
    margin-right: 1rem;

    &:last-child {
      padding-right: 80px;
    }
  }
`;

interface MobileSearchResultsProps {
  data: any;
}

const itemRenderer = (data: any, id: string) => (
  <SearchResultItem
    key={id}
    title={data.results[id].title}
    link={data.results[id].link}
    description={data.results[id].description}
    form={getForm(data.results[id])}
  />
);

export const MobileSearchResults: React.SFC<MobileSearchResultsProps> = ({
  data,
}) => {
  if (!data) {
    return null;
  }

  return (
    <div className="isMobile">
      <Container>
        <div>
          <AreaTitle>Top results</AreaTitle>
          <HLContainer>
            <HList>{data.top.map(itemRenderer.bind(null, data))}</HList>
          </HLContainer>
        </div>
        <div>
          <AreaTitle>Pages</AreaTitle>
          <HLContainer>
            <HList>{data.pages.map(itemRenderer.bind(null, data))}</HList>
          </HLContainer>
        </div>
        <div>
          <AreaTitle>Student Groups</AreaTitle>
          <HLContainer>
            <HList>{data.groups.map(itemRenderer.bind(null, data))}</HList>
          </HLContainer>
        </div>
        <div>
          <AreaTitle>Events</AreaTitle>
          <HLContainer>
            <HList>{data.events.map(itemRenderer.bind(null, data))}</HList>
          </HLContainer>
        </div>
        <div>
          <AreaTitle>News</AreaTitle>
          <HLContainer>
            <HList>{data.news.map(itemRenderer.bind(null, data))}</HList>
          </HLContainer>
        </div>
      </Container>
    </div>
  );
};
