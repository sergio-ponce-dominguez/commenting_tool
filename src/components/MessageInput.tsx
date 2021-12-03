import React, { FC } from 'react';
import { Box } from '@mui/system';
import { TextareaAutosize } from '@mui/base';
import { Button } from '@mui/material';

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
}

const MessageInput: FC<Props> = (props) => {
  const [message, setMessage] = React.useState<string>('');

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

  return (
    <Box>
      <TextareaAutosize
        style={{
          minWidth: '100%',
          maxWidth: '100%',
          minHeight: '138px',
          overflow: 'auto',
          lineHeight: 'inherit',
          borderRadius: 5,
          borderColor: 'lightgray',
          borderBottomWidth: '32px',
        }}
        aria-label="textarea"
        placeholder="What are your thoughts?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Box sx={{ float: 'right', bottom: 36, right: 20, position: 'relative' }}>
        {props.onCancel && (
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
        )}
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
        >
          {props.buttonText || 'Action'}
        </Button>
      </Box>
    </Box>
  );
};

export default MessageInput;
