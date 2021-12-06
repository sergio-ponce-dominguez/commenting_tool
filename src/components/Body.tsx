import React, { FC, useLayoutEffect, useState } from 'react';
import GlobalComment from './GlobalComment';
import Messages from './Messages';
import SortByMenu from './SortByMenu';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { getCurrentMessageThread, getIndentWidth } from '../redux/selectors/ui.selector';
import { getMessages } from '../redux/selectors/message.selector';
import Message from './Message';
import { Button } from '@mui/material';
import { useTypedDispatch } from '../utils/hooks';

const Body: FC = () => {
  const indentWidth = useSelector(getIndentWidth);
  const currentMessageThread = useSelector(getCurrentMessageThread);
  const messages = useSelector(getMessages);

  const [ref, setRef] = useState<null | HTMLElement>(null);
  const [deep, setDeep] = useState(2);

  const dispatch = useTypedDispatch();

  const currentMessageThreadExist =
    currentMessageThread !== '' && messages[currentMessageThread] !== undefined;

  useLayoutEffect(() => {
    const onResize = () => {
      if (ref) {
        setDeep(Math.floor((ref.clientWidth - 200) / indentWidth));
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [ref, indentWidth]);

  const onViewAllComments = () => {
    dispatch({ type: 'currentMessageThread/set', payload: { currentMessageThread: '' } });
  };

  const onViewParentComment = () => {
    dispatch({
      type: 'currentMessageThread/set',
      payload: { currentMessageThread: messages[currentMessageThread]?.parentId || '' },
    });
  };

  return (
    <Box mb={20} ref={setRef}>
      <GlobalComment />
      <SortByMenu />
      {currentMessageThreadExist ? (
        <>
          <Box display="flex" justifyContent="space-between">
            <Button size="small" style={{ textTransform: 'none' }} onClick={onViewParentComment}>
              View parent comment
            </Button>
            <Button size="small" style={{ textTransform: 'none' }} onClick={onViewAllComments}>
              View all comments
            </Button>
          </Box>
          <Message messageId={currentMessageThread} deep={deep} />
        </>
      ) : (
        <Messages parentId="" deep={deep} />
      )}
    </Box>
  );
};

export default Body;
