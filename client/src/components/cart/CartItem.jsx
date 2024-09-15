import { Typography, Box, styled, Button} from "@mui/material";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const Component = styled(Box)`
  border-top: 1px solid #f0f0f0;
  display: flex;
  padding: 16px 0;
  background: #fff
`;

const Image = styled('img')({
  width: '100px', 
  height: '100px', 
  objectFit: 'cover'
});

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
      <Box mr={2}>
        <Image src={item.url} alt="product" />
      </Box>
      <Box style={{ margin: 15 }}>
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
