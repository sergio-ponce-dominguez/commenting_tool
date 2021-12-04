import React, { FC } from 'react';
import GlobalComment from './GlobalComment';
import SortByMenu from './SortByMenu';

const Body: FC = () => {
  return (
    <>
      <GlobalComment />
      <SortByMenu />
    </>
  );
};

export default Body;
