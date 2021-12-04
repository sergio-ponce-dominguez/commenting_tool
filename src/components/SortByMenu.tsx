import React, { FC } from 'react';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { getSortOrder } from '../redux/selectors/ui.selector';
import { useTypedDispatch } from '../utils/hooks';
import { MenuItem, Select } from '@mui/material';
import { SortOrder } from '../types/ui.types';

const SortByMenu: FC = () => {
  const currentSortOrder = useSelector(getSortOrder);

  const dispatch = useTypedDispatch();

  const onChange = (sortOrder: SortOrder) => {
    dispatch({ type: 'sort/select', payload: { sortOrder } });
  };

  return (
    <Box borderBottom="1px solid lightgray">
      <Select
        value={currentSortOrder}
        onChange={(e) => {
          onChange(e.target.value as SortOrder);
        }}
        variant="standard"
      >
        <MenuItem value="date_up">Sort by date up</MenuItem>
        <MenuItem value="date_down">Sort by date down</MenuItem>
        <MenuItem value="vote_up">Sort by vote up</MenuItem>
        <MenuItem value="vote_down">Sort by vote down</MenuItem>
      </Select>
    </Box>
  );
};

export default SortByMenu;
