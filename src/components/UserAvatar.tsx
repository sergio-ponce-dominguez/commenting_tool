import React, { FC } from 'react';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUsers } from '../redux/selectors/user.selector';

interface Props {
  userId: string;
}

const UserAvatar: FC<Props> = (props) => {
  const users = useSelector(getUsers);

  const user = users[props.userId];

  if (!user) {
    return <Avatar alt="" />;
  }

  return <Avatar alt={user.name}>{user.name.substr(0, 2)}</Avatar>;
};

export default UserAvatar;
