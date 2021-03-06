import React, { FC, useState } from 'react';
import {
  AppBar,
  Container,
  CssBaseline,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
  Zoom,
} from '@mui/material';
import { Box } from '@mui/system';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getAllUserList, getCurrentUserId } from './redux/selectors/user.selector';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from './utils/hooks';
import Body from './components/Body';
import UserAvatar from './components/UserAvatar';

interface Props {
  window?: () => Window;
  children?: React.ReactElement;
}

const ScrollTop: FC<Props> = (props) => {
  const trigger = useScrollTrigger({
    target: props.window ? props.window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {props.children}
      </Box>
    </Zoom>
  );
};

const App: FC<Props> = (props) => {
  const currentUserId = useSelector(getCurrentUserId);
  const userList = useSelector(getAllUserList);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const dispatch = useTypedDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelectUser = (userId: string) => () => {
    dispatch({ type: 'user/select', payload: { userId } });
    setAnchorElUser(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex' }}>
            Commenting Tool
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Select User">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <UserAvatar userId={currentUserId} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userList.map((user) => (
                <MenuItem key={user.id} onClick={handleSelectUser(user.id)}>
                  <UserAvatar userId={user.id} />
                  <Typography sx={{ marginLeft: 1 }} textAlign="center">
                    {user.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth="sm">
        <Box sx={{ my: 2 }}>
          <Body />
        </Box>
      </Container>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default App;
