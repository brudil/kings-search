import React from 'react';
import { css } from 'emotion';
import {COLORS, SIZES} from '../constants';

const loadingStyle = css({
  textAlign: 'center',
  fontSize: SIZES.E3,
  color: COLORS.GREY,
  padding: `${SIZES.E1} 0`,
});

export const Loader: React.SFC<{ isLoading: boolean }> = ({ isLoading }) => (
  <div
    className={loadingStyle}
    aria-hidden={!isLoading}
    style={{ visibility: isLoading ? 'visible' : 'hidden' }}
  >
    loading…
  </div>
);
