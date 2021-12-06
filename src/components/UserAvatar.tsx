import React, { FC } from 'react';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUsers } from '../redux/selectors/user.selector';

interface Props {
  userId: string;
  /**
   * size in pixel of width and height
   * default value is 40
   */
  size?: number;
}

const UserAvatar: FC<Props> = (props) => {
  const { size = 40 } = props;
  const users = useSelector(getUsers);

  const user = users[props.userId];

  if (!user) {
    return <Avatar sx={{ width: size, height: size }} alt="" />;
  }

  return (
    <Avatar
      sx={{ width: size, height: size, fontSize: 'medium', backgroundColor: user.color }}
      alt={user.name}
    >
      {user.name.substr(0, 2)}
    </Avatar>
  );
};

export default UserAvatar;
