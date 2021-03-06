import React, { FC, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { TextareaAutosize } from '@mui/base';
import { Button, Tooltip } from '@mui/material';

interface Props {
  /**
   * Text to display in the action button, by example 'comment' or 'reply'
   */
  buttonText?: string;
  /**
   * called with the input text when the action button is clicked
   */
  onSubmit?: (message: string) => void;
  /**
   * if defined a cancel button is showed and the callback is called when the cancel button is clicked
   */
  onCancel?: () => void;
  /**
   * initial text to show
   */
  initialText?: string;
}

const MessageInput: FC<Props> = (props) => {
  const [message, setMessage] = useState<string>(props.initialText || '');

  const onSubmit = () => {
    if (props.onSubmit) {
      props.onSubmit(message);
      setMessage('');
    }
  };

  const onCancel = () => {
    if (props.onCancel) {
      props.onCancel();
      setMessage('');
    }
  };

  useEffect(() => {
    setMessage(props.initialText || '');
  }, [props.initialText]);

  return (
    <Box>
      <TextareaAutosize
        style={{
          minWidth: '100%',
          maxWidth: 'fit-content',
          minHeight: '139px',
          height: '139px',
          overflow: 'auto',
          lineHeight: 'inherit',
          borderRadius: 5,
          borderColor: 'lightgray',
          borderBottomWidth: '32px',
          padding: 10,
        }}
        aria-label="textarea"
        placeholder="What are your thoughts?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoFocus
      />
      <Box sx={{ float: 'right', bottom: 36, right: 20, position: 'relative' }}>
        {props.onCancel && (
          <Tooltip title="Cancel this comment">
            <Button
              variant="text"
              size="small"
              color="primary"
              style={{
                textTransform: 'none',
                height: 25,
                borderRadius: 50,
                paddingLeft: 15,
                paddingRight: 15,
                fontWeight: 'bold',
                marginRight: 20,
              }}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Submit this comment">
          <span>
            <Button
              variant="contained"
              size="small"
              color="primary"
              style={{
                textTransform: 'none',
                height: 25,
                borderRadius: 50,
                paddingLeft: 15,
                paddingRight: 15,
                fontWeight: 'bold',
              }}
              onClick={onSubmit}
              disabled={message === ''}
            >
              {props.buttonText || 'Action'}
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default MessageInput;
