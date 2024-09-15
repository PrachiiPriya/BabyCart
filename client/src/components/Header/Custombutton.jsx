import React, { useState, useContext } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { LocationOn, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(Box)`
  display: flex;
  margin: 0 3% 0% auto;
  & > button {
    margin-left: 40px;
    margin-right: 40px;
  }
  cursor: pointer;
`;

const LoginButton = styled(Button)`
  background-color: #FFD7BE;
  margin-bottom: 8px;
`;

const CartButton = styled(Button)`
  background-color: #FFD7BE;
  margin-bottom: 8px;
`;

export default function CustomButton() {
  const [open, setopen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const handleFilterClick = () => {
    navigate('/filter');
  };

  const openDialog = () => {
    setopen(true);
  };

  const cartOpener = () => {
    if (account) {
      // Assuming the correct route to the cart page
      navigate('/cart');
    } else {
      toast.info('Login to view your cart items!');
      // openDialog(); // Open login dialog if not logged in
    }
  };

 

  return (
    <Container>
      <Box sx={{ width: 20 }}></Box>
      <Wrapper>
        <Wrapper>
          <LocationOn />
          <Typography>Select location</Typography>
        </Wrapper>
        <Typography style={{ marginBottom: 8 }}>Schools and Preschools</Typography>
        <Typography style={{ marginBottom: 8, marginTop: 10 }}>Support</Typography>
        {
          account ? <Profile account={account} setAccount={setAccount} /> :
          <LoginButton variant='contained' onClick={openDialog}>Login/Register</LoginButton>
        }
        <Button onClick={handleFilterClick}>Search by Filter</Button>
        <Wrapper>
          <Container>
            <ShoppingCart />
            <CartButton onClick={cartOpener}>Cart</CartButton>
          </Container>
          <LoginDialog open={open} setopen={setopen} />
        </Wrapper>
      </Wrapper>
      <ToastContainer />
    </Container>
  );
}
