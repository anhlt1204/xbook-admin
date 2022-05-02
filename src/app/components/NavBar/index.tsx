import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BallotIcon from '@mui/icons-material/Ballot';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Box, ListItemButton } from '@mui/material';
import { styled } from '@mui/system';
import { useHistory } from 'react-router-dom';

const CategoryList = [
  { label: 'Danh mục', value: '/', icon: <FormatListBulletedIcon /> },
  { label: 'Sản phẩm', value: '/product', icon: <BallotIcon /> },
  { label: 'Tài khoản', value: '/account', icon: <ManageAccountsIcon /> },
  { label: 'Đơn hàng', value: '/cart', icon: <LocalAtmIcon /> },
];

export default function NavBar() {
  const history = useHistory();

  return (
    <Drawer variant="permanent" sx={{ width: '250px' }}>
      <DrawerHeader />
      <Divider />
      <List>
        {CategoryList.map((e, i) => (
          <ListItemButton
            key={i}
            onClick={() => history.push(`${e.value}`)}
            sx={{
              minHeight: 48,
              justifyContent: 'initial',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: 'center',
              }}
            >
              {e.icon}
            </ListItemIcon>
            <ListItemText primary={e.label} sx={{ opacity: 1 }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '250px',
  height: '64px',
}));
