import { Typography, Box, styled, Button} from "@mui/material";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const Component = styled(Box)(({ theme }) => ({
  borderTop: '1px solid #f0f0f0',
  display: 'flex',
  padding: '16px 0',
  background: '#fff',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '16px 8px',
  },
}));

const Image = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  objectFit: 'cover',
  flexShrink: 0,
  [theme.breakpoints.down('sm')]: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
}));

const Remove = styled(Button)`
  margin-top: 20px;
  font-size: 16px;
  color: #000;
  font-weight: 600
`

const CartItem = ({ item }) => {

  const dispatch = useDispatch();
  const removeItemFromCart = (id)=>{
    dispatch(removeFromCart(id));
  }
  return (
    <Component>
      <Box sx={{ mr: { xs: 0, sm: 2 } }}>
        <Image src={item.url} alt="product" />
      </Box>
      <Box sx={{ margin: { xs: 0, sm: 2 } }}>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          style={{ fontWeight: 700, color: '#000' }}
        >: {item.price}</Typography>
        <Typography variant="body2" color="textSecondary">Quantity: {item.quantity}</Typography>
        <Remove onClick={()=> removeItemFromCart(item.id)}>Remove</Remove>
      </Box>
    </Component>
  );
};

export default CartItem;
