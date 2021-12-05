import React, { FC, useEffect, useState } from 'react';
import { Tooltip, Typography } from '@mui/material';

interface Props {
  edited: boolean;
  modified: Date;
}

const ModificationDate: FC<Props> = (props) => {
  const [timeLapsed, setTimeLapsed] = useState('seconds');

  useEffect(() => {
    const interval = setInterval(() => {
      const milliseconds = Date.now() - props.modified.getTime();
      const seconds = milliseconds / 1000;
      if (seconds < 60) {
        setTimeLapsed('seconds');
        return;
      }
      const minutes = seconds / 60;
      if (minutes < 60) {
        setTimeLapsed(`${Math.floor(minutes)} min.`);
        return;
      }
      const hours = minutes / 60;
      if (hours < 24) {
        setTimeLapsed(`${Math.floor(hours)} hr.`);
        return;
      }
      const days = hours / 24;
      if (days < 60) {
        setTimeLapsed(`${Math.floor(days)} d.`);
        return;
      }
      setTimeLapsed('months');
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [props.modified]);

  return (
    <Tooltip title={props.modified.toString()}>
      <Typography>{`${props.edited ? 'Edited ' : ''}${timeLapsed} ago`}</Typography>
    </Tooltip>
  );
};

export default ModificationDate;
