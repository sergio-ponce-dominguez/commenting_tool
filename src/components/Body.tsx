import React, { FC } from 'react';
import GlobalComment from './GlobalComment';
import Messages from './Messages';
import SortByMenu from './SortByMenu';
import { Box } from '@mui/system';

const Body: FC = () => {
  return (
    <Box mb={20}>
      <GlobalComment />
      <SortByMenu />
      <Messages parentId="" deep={0} />
    </Box>
  );
};

export default Body;
