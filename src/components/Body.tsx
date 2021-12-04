import React, { FC } from 'react';
import GlobalComment from './GlobalComment';
import Messages from './Messages';
import SortByMenu from './SortByMenu';

const Body: FC = () => {
  return (
    <>
      <GlobalComment />
      <SortByMenu />
      <Messages parentId="" deep={0} />
    </>
  );
};

export default Body;
