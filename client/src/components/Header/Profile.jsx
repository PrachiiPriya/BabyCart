import React, { useState } from 'react';
import { Box, MenuItem, Typography, ListItemIcon } from '@mui/material';
import Menu from '@mui/material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useData } from '../../context/DataProvider';

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { account, setAccount } = useData();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAccount('');
    handleClose();
  };

  return (
    <>
      <Box onClick={handleClick} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ lineHeight: 1, cursor: 'pointer' }}>
          {account}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon><PowerSettingsNewIcon color="primary" fontSize="small" /></ListItemIcon>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
