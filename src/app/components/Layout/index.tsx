import React from 'react';
import Box from '@mui/material/Box';
import Header from 'app/components/Header';
import NavBar from 'app/components/NavBar';

export default function Layout({ children }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Header />
      <NavBar />
      <Box sx={{ paddingLeft: '250px', paddingTop: '64px' }}>{children}</Box>
    </Box>
  );
}
