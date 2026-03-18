import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  styled,
  Collapse,
  IconButton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/payment';

const PageBox = styled(Box)(({ theme }) => ({
  padding: 24,
  maxWidth: 1200,
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: 16,
  },
}));

const statusColor = {
  paid: 'success',
  created: 'default',
  failed: 'error',
};

function formatDate(dateStr) {
  if (!dateStr) return '–';
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function OrderRow({ order }) {
  const [open, setOpen] = useState(false);
  const itemsCount = order.items?.length || 0;

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {order.razorpayOrderId}
          </Typography>
        </TableCell>
        <TableCell>{formatDate(order.createdAt)}</TableCell>
        <TableCell align="right">₹{Number(order.amountRupees || 0).toFixed(2)}</TableCell>
        <TableCell>
          <Chip label={order.status} color={statusColor[order.status] || 'default'} size="small" />
        </TableCell>
        <TableCell align="right">{itemsCount} item(s)</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2, pl: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Items
              </Typography>
              {order.items?.length ? (
                <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      <Typography variant="body2">
                        {item.title} × {item.quantity || 1} — {item.price}
                      </Typography>
                    </li>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No items saved
                </Typography>
              )}
              {order.razorpayPaymentId && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Payment ID: {order.razorpayPaymentId}
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/orders`)
      .then((res) => setOrders(res.data || []))
      .catch((err) => setError(err.response?.data?.error || err.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', pt: 2, pb: 4 }}>
      <PageBox>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          My Orders
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          View all your orders and their payment status.
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && orders.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">No orders yet.</Typography>
            <Typography variant="body2" color="text.secondary">
              Orders will appear here after you place them from the cart.
            </Typography>
          </Paper>
        )}

        {!loading && !error && orders.length > 0 && (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Items</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <OrderRow key={order._id || order.razorpayOrderId} order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </PageBox>
    </Box>
  );
}
