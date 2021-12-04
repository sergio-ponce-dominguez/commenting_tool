import React, { FC } from 'react';

interface Props {
  parentId: string;
  deep: number;
}

const Messages: FC<Props> = (props) => {
  return (
    <>
      {props.parentId} {props.deep}
    </>
  );
};

export default Messages;
