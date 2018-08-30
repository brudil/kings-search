import React from 'react';
import qs from 'qs';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import styled from 'react-emotion';
import { MobileSearchResults } from './MobileSearchResults';
import { WindowSize } from 'react-fns';

const SearchAppContainer = styled('div')`
  font-family: Roboto, sans-serif;
  text-align: center;
`;

interface SearchAppProps {}

interface SearchAppState {
  query: string;
  queryCache: {
    [query: string]: any; // fix
  };
}

export class SearchApp extends React.Component<SearchAppProps, SearchAppState> {
  constructor(props: SearchAppProps) {
    super(props);

    this.state = {
      query: qs.parse(window.location.search.slice(1)).q || '',
      queryCache: {},
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const nextQuery = e.target.value;
    this.setState({ query: nextQuery });

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${qs.stringify({ q: nextQuery })}`,
    );

    this.handleSearch(nextQuery);
  }

  handleSearch(query: string) {
    fetch(
      `https://8g0l49i7fl.execute-api.eu-west-1.amazonaws.com/api/?q=${query}`,
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState((state) => ({
          queryCache: {
            ...state.queryCache,
            [query]: {
              isLoaded: true,
              data,
            },
          },
        }));
      });
  }

  componentDidMount() {
    const { query } = this.state;
    if (query !== '') {
      this.handleSearch(query)
    }
  }

  render() {
    const currentData = this.state.queryCache[this.state.query];
    return (
      <SearchAppContainer>
        <h1>Looking for something?</h1>
        <SearchInput onChange={this.handleInput} value={this.state.query} />

        <WindowSize
          render={({ width }) =>
            width > 768 ? (
              <SearchResults data={currentData} />
            ) : (
              <MobileSearchResults data={currentData} />
            )
          }
        />
      </SearchAppContainer>
    );
  }
}
