import React, { useState } from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useData } from '../../context/DataProvider';

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { account, setAccount } = useData(); // Use the custom hook to access context

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAccount(''); // Use null or an empty string based on your handling
    handleClose();
  };

  return (
    <>
      <Box onClick={handleClick}>
        <Typography style={{ marginBottom: 8, marginTop: 10, marginLeft: 30 }}>
          {account}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>
          <PowerSettingsNewIcon color="primary" fontSize="small" />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
