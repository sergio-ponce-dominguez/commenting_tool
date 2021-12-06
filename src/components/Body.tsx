import React, { FC, useLayoutEffect, useState } from 'react';
import GlobalComment from './GlobalComment';
import Messages from './Messages';
import SortByMenu from './SortByMenu';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { getIndentWidth } from '../redux/selectors/ui.selector';

const Body: FC = () => {
  const indentWidth = useSelector(getIndentWidth);

  const [ref, setRef] = useState<null | HTMLElement>(null);
  const [deep, setDeep] = useState(2);

  useLayoutEffect(() => {
    const onResize = () => {
      if (ref) {
        setDeep(Math.floor((ref.clientWidth - 200) / indentWidth));
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [ref]);
  return (
    <Box mb={20} ref={setRef}>
      <GlobalComment />
      <SortByMenu />
      <Messages parentId="" deep={deep} />
    </Box>
  );
};

export default Body;
