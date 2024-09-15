import React from 'react';
import { Box, Menu, MenuItem, Typography, styled } from '@mui/material';
import { navData } from '../../constants/Data';

const NavContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const MenuTitle = styled(Typography)`
  padding: 10px;
  cursor: pointer;
`;

function Navigation() {
  console.log('Navigation component rendered'); // Debug log

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [submenu, setSubmenu] = React.useState([]);

  const handleMenuOpen = (event, items) => {
    console.log('handleMenuOpen called'); // Debug log
    setAnchorEl(event.currentTarget);
    setSubmenu(items);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubmenu([]);
  };

  return (
    <NavContainer>
      {navData.map((item) => (
        <MenuTitle
          key={item.text}
          onClick={(event) => {handleMenuOpen(event, item.submenu); console.log('Button clicked.')}}
        >
          {item.text}
        </MenuTitle>
      ))}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {submenu.map((subItem, index) => (
          <MenuItem key={index} onClick={handleMenuClose}>{subItem}</MenuItem>
        ))}
      </Menu>
    </NavContainer>
  );
}

export default Navigation;
