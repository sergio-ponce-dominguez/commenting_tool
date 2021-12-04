import React, { FC } from 'react';
import { Box } from '@mui/system';
import MessageOutlinedIcon from '@mui/icons-material/ChatBubbleOutline';
import { useSelector } from 'react-redux';
import { getMessageCount } from '../redux/selectors/message.selector';
import { Typography } from '@mui/material';

const MessageCount: FC = () => {
  const messageCount = useSelector(getMessageCount);
  return (
    <Box display="flex" alignItems="center">
      <MessageOutlinedIcon />
      <Typography variant="subtitle2" m="5px" fontWeight="bold">
        {`${messageCount} ${messageCount === 1 ? 'Comment' : 'Comments'}`}
      </Typography>
    </Box>
  );
};

export default MessageCount;
