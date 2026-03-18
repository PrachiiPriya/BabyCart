import React, { useState, useContext } from 'react';
import { Box, Button, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { ShoppingCart, FilterList, ReceiptLong } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';

const ActionsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: theme.spacing(2.5),
  '& .MuiButton-root': {
    minHeight: 36,
    textTransform: 'none',
    fontSize: '0.8rem',
    fontWeight: 500,
    borderRadius: 6,
  },
  [theme.breakpoints.down('lg')]: {
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(1.5),
    width: '100%',
  },
}));

const LoginButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#e91e63',
  fontWeight: 600,
  '&:hover': { backgroundColor: '#fce4ec' },
});

const CartButton = styled(Button)({
  backgroundColor: 'transparent',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.5)',
  '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)', borderColor: '#fff' },
});

const FilterButton = styled(Button)({
  backgroundColor: 'transparent',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.5)',
  '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)', borderColor: '#fff' },
});

export default function CustomButton({ onCloseDrawer }) {
  const [open, setopen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const closeDrawer = () => {
    if (typeof onCloseDrawer === 'function') onCloseDrawer();
  };

  const handleFilterClick = () => {
    navigate('/filter');
    closeDrawer();
  };

  const openDialog = () => {
    setopen(true);
  };

  const cartOpener = () => {
    if (account) {
      navigate('/cart');
      closeDrawer();
    } else {
      toast.info('Login to view your cart items!');
    }
  };

  return (
    <>
      <ActionsRow>
        {account ? (
          <Profile account={account} setAccount={setAccount} />
        ) : (
          <LoginButton variant="contained" onClick={openDialog} size="small">Login / Register</LoginButton>
        )}
        <FilterButton
          onClick={handleFilterClick}
          size="small"
          startIcon={<FilterList sx={{ fontSize: 16 }} />}
        >
          Filters
        </FilterButton>
        <FilterButton
          onClick={() => { navigate('/orders'); closeDrawer(); }}
          size="small"
          startIcon={<ReceiptLong sx={{ fontSize: 16 }} />}
        >
          My Orders
        </FilterButton>
        <CartButton
          size="small"
          onClick={cartOpener}
          startIcon={<ShoppingCart sx={{ fontSize: 18 }} />}
        >
          Cart
        </CartButton>
      </ActionsRow>
      <LoginDialog open={open} setopen={setopen} />
      <ToastContainer />
    </>
  );
}
