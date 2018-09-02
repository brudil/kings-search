import React from 'react';
import qs from 'qs';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import styled, {css, cx} from 'react-emotion';
import { MobileSearchResults } from './MobileSearchResults';
import { WindowSize } from 'react-fns';
import { Loader } from './Loader';
import {COLORS} from "../constants";

const SearchAppContainer = styled('div')`
  font-family: Roboto, sans-serif;
  text-align: center;
  max-width: 1280px;
  margin: 0 auto;
`;

const loadingDimStyles = css`
  opacity: 0.7;
`;

const welcomeTextStyles = css`
    color: ${COLORS.PURPLE};
    margin-top: 20vh;
    font-size: 10vmin;
    opacity: 1;
    transition: margin-top ease 300ms, font-size ease 800ms, opacity ease 300ms;
    
    .SearchApp--search & {
      margin-top: 0;
      font-size: 0.4rem;
      opacity: 0;
    }
`;

interface SearchAppProps {}

interface SearchQueryPayload {
  top: string[];
  news: string[];
  pages: string[];
  groups: string[];
}

interface SearchAppState {
  query: string;
  queryId: number;
  isLoading: boolean;
  initialView: boolean;
  latestData: null | SearchQueryPayload; // fix
  queryCache: {
    [query: string]: SearchQueryPayload; // fix
  };
}

export class SearchApp extends React.Component<SearchAppProps, SearchAppState> {
  constructor(props: SearchAppProps) {
    super(props);

    const query = qs.parse(window.location.search.slice(1)).q || '';

    this.state = {
      query,
      queryCache: {},
      queryId: 0,
      latestData: null,
      isLoading: false,
      initialView: query === '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const nextQuery = e.target.value;
    this.setState(
      (state) => ({ query: nextQuery, queryId: state.queryId + 1 }),
      () => {
        window.history.replaceState(
          {},
          '',
          `${window.location.pathname}?${qs.stringify({ q: nextQuery })}`,
        );

        this.handleSearch(nextQuery, this.state.queryId);
      },
    );
  }

  handleSearch(query: string, queryId: number) {
    if (!this.state.queryCache.hasOwnProperty(query)) {
      this.setState(() => ({
        isLoading: true,
        initialView: false,
      }));

      console.log(`querying ${query} as ${queryId}`);
      fetch(
        `https://8g0l49i7fl.execute-api.eu-west-1.amazonaws.com/api/?q=${query}`,
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState((state) => {
            console.log(`LOADED: ${query} as ${queryId}`);
            const latestQuery = state.query === query;

            if (latestQuery) {
              return {
                ...state,
                isLoading: false,
                latestData: data,
                queryCache: {
                  ...state.queryCache,
                  [query]: data,
                }
              }
            }

            return {
              ...state,
              queryCache: {
                ...state.queryCache,
                [query]: data,
              }
            }
          });
        });
    } else {
      this.setState((state) => ({
        latestData: state.queryCache[query],
        isLoading: false,
      }))
    }
  }

  componentDidMount() {
    const { query } = this.state;
    if (query !== '') {
      this.handleSearch(query, 0);
    }
  }

  renderContent({ width }: { width: number }) {
    const { latestData, isLoading } = this.state;

    return (
      <div>
        <Loader isLoading={isLoading} />


        <div className={cx({ [loadingDimStyles]: isLoading })}>
          {!!latestData && (width > 768 ? (
            <SearchResults data={latestData} />
          ) : (
            <MobileSearchResults data={latestData} />
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <SearchAppContainer className={cx({ 'SearchApp--search': !this.state.initialView })}>
        <h1 className={welcomeTextStyles}>Looking for something?</h1>
        <SearchInput onChange={this.handleInput} value={this.state.query} autoFocus />

        <WindowSize render={this.renderContent.bind(this)} />
      </SearchAppContainer>
    );
  }
}
