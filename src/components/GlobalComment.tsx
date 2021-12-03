import React, { FC } from 'react';
import { Box } from '@mui/system';
import MessageCount from './MessageCount';
import MessageInput from './MessageInput';

const GlobalComment: FC = () => {
  return (
    <Box>
      <MessageCount />
      <MessageInput buttonText="Comment" />
    </Box>
  );
};

export default GlobalComment;
