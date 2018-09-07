import React from 'react';
import styled, {css} from "react-emotion";
import {COLORS} from "../constants";
import {FilterMap} from "../types";

const listStyles = css({
  '@media (min-width: 768px)': {
    display: 'flex',
  },
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'none',
  justifyContent: "center",
  '& li ': {
    padding: '1rem',
  }
});

const Button = styled('button')<{ active: boolean }>(({ active }) => ({
  padding: '0.4rem',
  color: active ? '#fff' : COLORS.PURPLE,
  backgroundColor: active ? COLORS.PURPLE : '#fff',
  border: `3px solid ${COLORS.PURPLE}`,
  fontSize: '1rem',
}));

interface FilteringProps {
  filters: {
    [key: string]: string;
  };
  filterMap: FilterMap;
  toggle(key: string): void;
}

export const Filtering: React.SFC<FilteringProps> = ({ filters, filterMap, toggle }) => (
  <ul className={listStyles}>
    {Object.keys(filters).map((key) => (
      <li key={key}>
        <Button onClick={() => toggle(key)} active={filterMap[key]}>
          {filters[key]}
        </Button>
      </li>
    ))}
  </ul>
)
