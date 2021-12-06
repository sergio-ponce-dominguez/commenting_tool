import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getMessages } from '../redux/selectors/message.selector';
import { getSortOrder } from '../redux/selectors/ui.selector';
import Message from './Message';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button } from '@mui/material';
import { useTypedDispatch } from '../utils/hooks';

interface Props {
  parentId: string;
  deep: number;
}

const Messages: FC<Props> = (props) => {
  const messages = useSelector(getMessages);
  const sortOrder = useSelector(getSortOrder);

  const dispatch = useTypedDispatch();

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
        repliesList.sort((a, b) => (messages[b]?.vote || 0) - (messages[a]?.vote || 0));
        break;
      case 'vote_up':
        repliesList.sort((a, b) => (messages[a]?.vote || 0) - (messages[b]?.vote || 0));
        break;
      default:
        break;
    }
    return repliesList;
  }, [sortOrder, replies]);

  const onContinueThread = () => {
    dispatch({
      type: 'currentMessageThread/set',
      payload: { currentMessageThread: props.parentId },
    });
  };

  if (props.deep <= 0 && sortedReplies.length > 0) {
    return (
      <Button
        size="small"
        style={{ textTransform: 'none' }}
        endIcon={<KeyboardArrowRightIcon />}
        onClick={onContinueThread}
      >
        Continue this thread
      </Button>
    );
  }

  return (
    <>
      {sortedReplies.map((id) => (
        <Message key={id} messageId={id} deep={props.deep} />
      ))}
    </>
  );
};

export default Messages;
