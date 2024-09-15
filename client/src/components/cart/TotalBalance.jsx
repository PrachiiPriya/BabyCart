import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";

const Container = styled(Box)`
  padding: 16px;
  background: #fff;
  border: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const Row = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

const TotalAmount = () => {
  const { cartItems } = useSelector(state => state.cart);

  let totalPrice = 0;
  let totalDiscount = 0;

  const extractPrice = (priceStr) => {
    const numStr = priceStr.replace(/[^\d.]/g, ''); // Removes non-numeric characters except for the decimal point
    return parseFloat(numStr);
  };

  const extractDiscount = (discountStr) => {
    const numStr = discountStr.replace(/[^\d]/g, ''); // Removes non-numeric characters
    return parseFloat(numStr);
  };

  cartItems.forEach(item => {
    const price = extractPrice(item.price);
    const discount = extractDiscount(item.discount);

    totalPrice += price * item.quantity;
    totalDiscount += (price * (discount / 100)) * item.quantity;
  });

  const payableAmount = totalPrice - totalDiscount;

  return (
    <Container>
      <Heading>Price Details</Heading>
      <Row>
        <Typography>Total Price</Typography>
        <Typography>{`Rs.${totalPrice.toFixed(2)}`}</Typography>
      </Row>
      <Row>
        <Typography>Total Discount</Typography>
        <Typography>{`Rs.${totalDiscount.toFixed(2)}`}</Typography>
      </Row>
      <Row>
        <Typography>Payable Amount</Typography>
        <Typography>{`Rs.${payableAmount.toFixed(2)}`}</Typography>
      </Row>
    </Container>
  );
};

export default TotalAmount;
