import { Typography, Grid, Box, styled, Button} from "@mui/material";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//Components
import CartItem from "./CartItem";
import TotalBalance from "./TotalBalance";

const Container = styled(Grid)`
   padding: 35px 135px;
`
const Header = styled(Box)`
   padding: 15px 24px;
   background: #fff;
`
const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  width: 250px;
  height: 51px;
  &:hover {
    background: #fb641b; 
    opacity: 0.9; 
  }
`;
const ButtonWrapper = styled(Box)`
   padding: 16px 22px;
   background-color: #fff;
   box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
   border-top: 1px solid #f0f0f0;
`
const Cart = () => {
  const { cartItems } = useSelector(state => state.cart);

  const handleOrder = () =>{
    console.log('Order button clicked');
    toast.success("Your order has been placed! Keep shopping!");
  }
  return (
    <div style={{ backgroundColor: '#F2F2F2' }}>
      {
      cartItems.length ?
        <Container container>
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography>My Cart({cartItems.length})</Typography>
            </Header>
            {
              cartItems.map(item => (
                <CartItem item={item}/>
              ))
            }
            <ButtonWrapper>
              <StyledButton onClick={()=>handleOrder()}>PLACE ORDER</StyledButton>
            </ButtonWrapper>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalBalance cartItems={cartItems}/>
          </Grid>
        </Container>
        : <div>Empty</div>
      }
      <ToastContainer/>
    </div>
  )
}

export default Cart;