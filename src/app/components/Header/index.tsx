import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserMenu from 'app/components/UserMenu';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - 250px)`, ml: `250px` }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: '28px',
              lineHeight: '32px',
              fontWeight: 700,
            }}
          >
            XBOOK
          </Typography>

          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
