import React, { useState } from 'react';
import { Box, Menu, MenuItem, styled, Typography } from '@mui/material';
import { navData } from '../../constants/Data';
import { yellow } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin: 100px 130px 0 130px;

  @media (max-width: 1024px) {
    margin: 80px 60px 0 60px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 60px 30px 0 30px;
  }

  @media (max-width: 480px) {
    margin: 40px 10px 0 10px;
  }
`;

const StyledDiv = styled('div')({
  backgroundColor: yellow[500],
  height: '50px',
  '@media (max-width: 768px)': {
    height: 'auto',
  },
});

const MenuTitle = styled(Typography)`
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 5px;
  }
`;

export default function Navbar() {
  const navigate = useNavigate();
  const [dropMenu, setDropMenu] = useState(null);
  const [submenu, setSubmenu] = useState([]);

  const handleMenuOpen = (event, items) => {
    setDropMenu(event.currentTarget);
    setSubmenu(items);
  };

  const handleMenuClose = () => {
    setDropMenu(null);
    setSubmenu([]);
  };

  const menuItemPg = (Item) => {
    navigate(`/search/${Item}`);
    handleMenuClose();
  };

  return (
    <StyledDiv>
      <Component>
        {navData.map((data, index) => (
          <MenuTitle
            key={index}
            onClick={(event) => handleMenuOpen(event, data.submenu)}
          >
            {data.text}
          </MenuTitle>
        ))}
      </Component>
      <Menu
        anchorEl={dropMenu}
        open={Boolean(dropMenu)}
        onClose={handleMenuClose}
      >
        {submenu.map((subItem, index) => (
          <MenuItem key={index} onClick={() => menuItemPg(subItem)}>
            {subItem}
          </MenuItem>
        ))}
      </Menu>
    </StyledDiv>
  );
}
