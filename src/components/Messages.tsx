import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getMessages } from '../redux/selectors/message.selector';
import { getSortOrder } from '../redux/selectors/ui.selector';

interface Props {
  parentId: string;
  deep: number;
}

const Messages: FC<Props> = (props) => {
  const messages = useSelector(getMessages);
  const sortOrder = useSelector(getSortOrder);

  const { replies } = messages[props.parentId] || { replies: {} };

  const sortedReplies = useMemo(() => {
    const repliesList = Object.keys(replies);
    switch (sortOrder) {
      case 'date_down':
        repliesList.sort(
          (a, b) =>
            (messages[a]?.date.getTime() || Date.now()) -
            (messages[b]?.date.getTime() || Date.now()),
        );
        break;
      case 'date_up':
        repliesList.sort(
          (a, b) =>
            (messages[b]?.date.getTime() || Date.now()) -
            (messages[a]?.date.getTime() || Date.now()),
        );
        break;
      case 'vote_down':
        repliesList.sort((a, b) => (messages[a]?.vote || 0) - (messages[b]?.vote || 0));
        break;
      case 'vote_up':
        repliesList.sort((a, b) => (messages[b]?.vote || 0) - (messages[a]?.vote || 0));
        break;
      default:
        break;
    }
    return repliesList;
  }, [sortOrder, replies]);

  return (
    <>
      {sortedReplies.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </>
  );
};

export default Messages;
