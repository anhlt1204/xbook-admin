import { IconButton, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { useDispatch } from 'react-redux';
import { loginActions } from 'app/pages/LoginPage/slice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserMenu() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(loginActions.outUser());
    window.location.href = '/login';
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <AccountCircleIcon fontSize="large" sx={{ color: '#FFF' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0.8,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem style={{ gap: '15px' }} onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
