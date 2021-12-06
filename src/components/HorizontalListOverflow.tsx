import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Box } from '@mui/system';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface Props {
  /**
   * element to display horizontally
   */
  elements: React.ReactNode[];
}

/**
 * Display the element horizontally if no overflow
 * if overflow the hidden element are chown in an ellipsis menu
 */
const HorizontalListOverflow: FC<Props> = (props) => {
  const [showedItems, setShowedItems] = useState<React.ReactNode[]>(props.elements);
  const [hiddenItems, setHiddenItems] = useState<React.ReactNode[]>([]);
  const [ref, setRef] = useState<null | HTMLElement>(null);
  const [anchorHiddenItems, setAnchorHiddenItems] = useState<null | HTMLElement>(null);

  const handleOpenHiddenItems = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorHiddenItems(event.currentTarget);
  };

  const handleCloseHiddenItems = () => {
    setAnchorHiddenItems(null);
  };

  useLayoutEffect(() => {
    if (ref) {
      if (ref.clientHeight < ref.scrollHeight && showedItems.length > 0) {
        const last = showedItems[showedItems.length - 1];
        setShowedItems(showedItems.slice(0, -1));
        setHiddenItems([last, ...hiddenItems]);
      }
    }
  }, [ref, showedItems, hiddenItems]);

  useEffect(() => {
    setShowedItems(props.elements);
    setHiddenItems([]);
  }, [props.elements]);

  return (
    <Box overflow="auto" height="40px" ref={setRef}>
      {showedItems.map((element, index) => (
        <Box key={index} display="inline-block">
          {element}
        </Box>
      ))}
      {hiddenItems.length > 0 && (
        <Box display="inline-block" sx={{ flexGrow: 0 }}>
          <Tooltip title="More">
            <IconButton onClick={handleOpenHiddenItems} sx={{ p: 0 }}>
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '40px' }}
            anchorEl={anchorHiddenItems}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorHiddenItems)}
            onClose={handleCloseHiddenItems}
          >
            {hiddenItems.map((element, index) => (
              <MenuItem key={index} onClick={handleCloseHiddenItems} sx={{ p: 0 }}>
                {element}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default HorizontalListOverflow;
