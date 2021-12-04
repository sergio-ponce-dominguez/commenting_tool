import React, { FC } from 'react';
import { Box } from '@mui/system';
import MessageCount from './MessageCount';
import MessageInput from './MessageInput';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../redux/selectors/user.selector';
import { useTypedDispatch } from '../utils/hooks';

const GlobalComment: FC = () => {
  const currentUser = useSelector(getCurrentUser);

  const dispatch = useTypedDispatch();

  const onSubmit = (text: string) => {
    currentUser &&
      dispatch({ type: 'comment/add', payload: { text, parentId: null, userId: currentUser.id } });
  };

  return (
    <Box>
      <MessageCount />
      <Typography component="span">Comment as</Typography>{' '}
      <Typography component="span" color="primary">
        {currentUser?.name}
      </Typography>
      <MessageInput buttonText="Comment" onSubmit={onSubmit} />
    </Box>
  );
};

export default GlobalComment;
