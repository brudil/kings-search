import React from 'react';
import { css } from 'emotion';
import {COLORS} from "../constants";

const loadingStyle = css({
  textAlign: 'center',
  fontSize: '1rem',
  color: COLORS.GREY,
  padding: '0.4rem 0'
});

export const Loader: React.SFC<{ isLoading: boolean }> = ({ isLoading }) => <div className={loadingStyle} aria-hidden={!isLoading} style={{ visibility: isLoading ? 'visible' : 'hidden' }}>loading…</div>;
