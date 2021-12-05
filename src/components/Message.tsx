import React, { FC, useState } from 'react';
import { Box } from '@mui/system';
import MessageOutlinedIcon from '@mui/icons-material/ChatBubbleOutline';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useSelector } from 'react-redux';
import { getMessages } from '../redux/selectors/message.selector';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import { getCurrentUserId, getUsers } from '../redux/selectors/user.selector';
import UserAvatar from './UserAvatar';
import ModificationDate from './ModificationDate';
import MessageInput from './MessageInput';
import Messages from './Messages';

interface Props {
  messageId: string;
  deep: number;
}

const Message: FC<Props> = (props) => {
  const messages = useSelector(getMessages);
  const users = useSelector(getUsers);
  const currentUserId = useSelector(getCurrentUserId);

  const [isShowInputArea, setIsShowInputArea] = useState(false);
  const [inputAreaAction, setInputAreaAction] = useState<'Reply' | 'Edit'>('Reply');
  const [isExpanded, setIsExpanded] = useState(true);

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
          <Box key="contract-message" width="42px" display="flex" justifyContent="center">
            <div onClick={toggleExpand} style={{ margin: 5 }}>
              <Box
                // m="5px"
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
              <Typography>{message?.text}</Typography>
              <Box key="actions">
                <Tooltip title="Vote up this message">
                  <span>
                    <IconButton disabled={currentUserIsOwner}>
                      <KeyboardDoubleArrowUpIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Typography component="span">{message?.vote}</Typography>
                <Tooltip title="Vote down this message">
                  <span>
                    <IconButton disabled={currentUserIsOwner}>
                      <KeyboardDoubleArrowDownIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Make a reply to this message">
                  <Button
                    color="inherit"
                    variant="text"
                    startIcon={<MessageOutlinedIcon />}
                    style={{ textTransform: 'none' }}
                    onClick={onReplyClick}
                  >
                    Reply
                  </Button>
                </Tooltip>
                {currentUserIsOwner && (
                  <Tooltip title="Edit this message">
                    <Button
                      color="inherit"
                      variant="text"
                      style={{ textTransform: 'none' }}
                      onClick={onEditClick}
                    >
                      Edit
                    </Button>
                  </Tooltip>
                )}
              </Box>
              {isShowInputArea && <MessageInput buttonText={inputAreaAction} />}
            </Box>
            <Box key="replies">
              <Messages parentId={props.messageId} deep={props.deep + 1} />
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
