import React, { FC, useState } from 'react';
import { Box } from '@mui/system';
import MessageOutlinedIcon from '@mui/icons-material/ChatBubbleOutline';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useSelector } from 'react-redux';
import { getMessages } from '../redux/selectors/message.selector';
import { Button, IconButton, Typography } from '@mui/material';
import { getCurrentUserId, getUsers } from '../redux/selectors/user.selector';
import UserAvatar from './UserAvatar';
import ModificationDate from './ModificationDate';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { useTypedDispatch } from '../utils/hooks';
import HorizontalListOverflow from './HorizontalListOverflow';
import { getIndentWidth } from '../redux/selectors/ui.selector';

interface Props {
  messageId: string;
  deep: number;
}

const Message: FC<Props> = (props) => {
  const messages = useSelector(getMessages);
  const users = useSelector(getUsers);
  const currentUserId = useSelector(getCurrentUserId);
  const indentWidth = useSelector(getIndentWidth);

  const [isShowInputArea, setIsShowInputArea] = useState(false);
  const [inputAreaAction, setInputAreaAction] = useState<'Reply' | 'Edit'>('Reply');
  const [isExpanded, setIsExpanded] = useState(true);

  const dispatch = useTypedDispatch();

  const message = messages[props.messageId];
  const userId = message?.userId || '';
  const userName = users[userId]?.name || '';
  const modifiedDate = message?.date || new Date();
  const currentUserIsOwner = currentUserId === userId;

  const onReplyClick = () => {
    if (inputAreaAction !== 'Reply' && isShowInputArea) {
      setInputAreaAction('Reply');
    } else {
      setIsShowInputArea(!isShowInputArea);
      setInputAreaAction('Reply');
    }
  };

  const onEditClick = () => {
    if (inputAreaAction !== 'Edit' && isShowInputArea) {
      setInputAreaAction('Edit');
    } else {
      setIsShowInputArea(!isShowInputArea);
      setInputAreaAction('Edit');
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onCancel = () => {
    setIsShowInputArea(false);
  };

  const onSubmit = (text: string) => {
    if (message) {
      if (inputAreaAction === 'Reply') {
        dispatch({
          type: 'comment/add',
          payload: { text, parentId: props.messageId, userId: currentUserId },
        });
      } else if (inputAreaAction === 'Edit') {
        dispatch({
          type: 'comment/update',
          payload: { text, messageId: props.messageId },
        });
      }
    }
    setIsShowInputArea(false);
  };

  const onUpVote = () => {
    if (message) {
      dispatch({
        type: 'comment/upVote',
        payload: { messageId: props.messageId },
      });
    }
  };

  const onDownVote = () => {
    if (message) {
      dispatch({
        type: 'comment/downVote',
        payload: { messageId: props.messageId },
      });
    }
  };

  const messageInfo = (
    <Box key="message-info" display="flex" alignItems="center">
      <Box key="user-avatar">
        <UserAvatar userId={userId} />
      </Box>
      <Box key="user-name" display="flex">
        <Typography sx={{ marginLeft: '2px', marginRight: '2px' }}>{`${userName} ·`}</Typography>
        <ModificationDate edited={message?.edited || false} modified={modifiedDate} />
      </Box>
    </Box>
  );

  if (isExpanded) {
    return (
      <Box mt={1}>
        {messageInfo}
        <Box key="corpus" display="flex">
          <Box
            key="contract-message"
            width={indentWidth}
            minWidth={indentWidth}
            display="flex"
            justifyContent="center"
          >
            <div onClick={toggleExpand} style={{ margin: 5 }}>
              <Box
                borderLeft="1px solid lightgray"
                height="100%"
                sx={{
                  cursor: 'pointer',
                  ':hover': { borderLeft: '2px solid deepskyblue' },
                }}
              />
            </div>
          </Box>
          <Box key="content" width="100%">
            <Box key="message-text">
              <Typography marginLeft="2px" component="div">
                <pre style={{ fontFamily: 'inherit', margin: 0 }}>{message?.text}</pre>
              </Typography>
              <HorizontalListOverflow
                elements={[
                  <>
                    <IconButton disabled={currentUserIsOwner} onClick={onUpVote}>
                      <KeyboardDoubleArrowUpIcon />
                    </IconButton>
                    <Typography component="span">{message?.vote}</Typography>
                    <IconButton disabled={currentUserIsOwner} onClick={onDownVote}>
                      <KeyboardDoubleArrowDownIcon />
                    </IconButton>
                  </>,
                  <Button
                    color="inherit"
                    variant="text"
                    startIcon={<MessageOutlinedIcon />}
                    style={{ textTransform: 'none' }}
                    onClick={onReplyClick}
                  >
                    Reply
                  </Button>,
                  currentUserIsOwner && (
                    <Button
                      color="inherit"
                      variant="text"
                      style={{ textTransform: 'none' }}
                      onClick={onEditClick}
                    >
                      Edit
                    </Button>
                  ),
                ]}
              />
              {isShowInputArea && (
                <MessageInput
                  buttonText={inputAreaAction}
                  onCancel={onCancel}
                  onSubmit={onSubmit}
                />
              )}
            </Box>
            <Box key="replies">
              <Messages parentId={props.messageId} deep={props.deep - 1} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box mt={1} display="flex">
        <IconButton onClick={toggleExpand}>
          <OpenInFullIcon />
        </IconButton>
        {messageInfo}
      </Box>
    );
  }
};

export default Message;
