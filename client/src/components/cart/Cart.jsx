import { useState } from 'react';
import { Typography, Grid, Box, styled, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import CartItem from './CartItem';
import TotalBalance from './TotalBalance';
import { clearCart } from '../../redux/actions/cartActions';

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';
const API_BASE = 'http://localhost:8000/api/payment';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}

function getPayableAmount(cartItems) {
  const extractPrice = (str) => parseFloat(String(str).replace(/[^\d.]/g, '')) || 0;
  const extractDiscount = (str) => parseFloat(String(str).replace(/[^\d]/g, '')) || 0;
  let total = 0;
  cartItems.forEach((item) => {
    const price = extractPrice(item.price);
    const discount = extractDiscount(item.discount);
    total += price * (item.quantity || 1) - (price * (discount / 100)) * (item.quantity || 1);
  });
  return Math.max(0, total);
}

const Container = styled(Grid)(({ theme }) => ({
  padding: '35px 135px',
  [theme.breakpoints.down('lg')]: { padding: '24px 48px' },
  [theme.breakpoints.down('md')]: { padding: '20px 24px' },
  [theme.breakpoints.down('sm')]: { padding: '16px 12px' },
}));

const Header = styled(Box)(({ theme }) => ({
  padding: '15px 24px',
  background: '#fff',
  [theme.breakpoints.down('sm')]: { padding: '12px 16px' },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  marginLeft: 'auto',
  background: '#fb641b',
  color: '#fff',
  width: 250,
  height: 51,
  '&:hover': { background: '#fb641b', opacity: 0.9 },
  [theme.breakpoints.down('sm')]: { width: '100%', marginLeft: 0 },
}));

const ButtonWrapper = styled(Box)(({ theme }) => ({
  padding: '16px 22px',
  backgroundColor: '#fff',
  boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
  borderTop: '1px solid #f0f0f0',
  [theme.breakpoints.down('sm')]: { padding: '12px 16px' },
}));

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    const amount = getPayableAmount(cartItems);
    if (amount < 1) {
      toast.warn('Cart total must be at least ₹1 for payment.');
      return;
    }
    setLoading(true);
    try {
      await loadRazorpayScript();
      const receipt = `babycart_${Date.now()}`;
      const items = cartItems.map((i) => ({
        productId: i.id,
        title: i.title,
        price: i.price,
        discount: i.discount || '0',
        quantity: i.quantity || 1,
        url: i.url,
      }));

      const { data } = await axios.post(`${API_BASE}/create-order`, {
        amount: amount.toFixed(2),
        receipt,
        items,
      });

      if (data.error && !data.orderId) {
        toast.error(data.error || 'Payment not configured');
        setLoading(false);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency || 'INR',
        order_id: data.orderId,
        name: 'BabyCart',
        description: 'Order payment',
        theme: { color: '#e91e63' },
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${API_BASE}/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verifyRes.data?.success) {
              toast.success('Payment verified! Order placed.');
              dispatch(clearCart());
            } else {
              toast.error(verifyRes.data?.error || 'Payment verification failed');
            }
          } catch (e) {
            toast.error(e.response?.data?.error || 'Payment verification failed');
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        toast.error('Payment failed or cancelled.');
      });
      rzp.open();
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Could not start payment';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#F2F2F2' }}>
      {cartItems.length ? (
        <Container container>
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography>My Cart ({cartItems.length})</Typography>
            </Header>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <ButtonWrapper>
              <StyledButton onClick={handleOrder} disabled={loading}>
                {loading ? 'Opening…' : 'PLACE ORDER (Razorpay)'}
              </StyledButton>
            </ButtonWrapper>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalBalance cartItems={cartItems} />
          </Grid>
        </Container>
      ) : (
        <div>Empty</div>
      )}
      <ToastContainer />
    </div>
  );
}
