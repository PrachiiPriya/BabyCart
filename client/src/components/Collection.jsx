import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Button, styled, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useData } from '../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const Container = styled(Box)`
  background-color: #ccc;
  padding: 20px;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const ProductContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the items */
  margin: 10px;
  gap: 20px; /* Add a gap between items */

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const ProductCard = styled(Box)`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 300px;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }

  @media (max-width: 600px) {
    width: 90%;
    margin: 10px auto;
  }
`;

const Image = styled('img')({
  objectFit: 'contain',
  height: 300,
  width: '100%',
  marginBottom: 10,

  '@media (max-width: 960px)': {
    height: 200,
  },

  '@media (max-width: 600px)': {
    height: 150,
  }
});

const ProductInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const AddToCartButton = styled(Button)`
  margin-top: 10px;
  background-color: #f50057;
  color: white;

  &:hover {
    background-color: #c51162;
  }
`;

function Collection() {
  const { collection } = useParams();
  const [products, setProducts] = useState([]);
  const { account,setAccount } = useData();
  const [quantity, setQuantity] = useState(1);

  const navigate= useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/boutiques/${collection}`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [collection]);

  const handleAddToCart = (product)=>{
    const id= product.id;
    if(account){
      dispatch(addToCart(id, quantity));
      navigate('/cart');
    } else{
      toast.info('Please login to add items to cart!');
    }
  }

  return (
    <Container>
      <Typography variant="h4" style={{ textAlign: 'center' }}>{collection}</Typography>
      <ProductContainer>
        {products.map((product, index) => (
          <ProductCard key={index}>
            <Image src={product.url} alt={product.title} />
            <ProductInfo>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body1">{product.price}</Typography>
              <Typography variant="body2" color="textSecondary">{`Category: ${product.category}`}</Typography>
              <Typography variant="body2" color="textSecondary">{`Discount: ${product.discount}`}</Typography>
              <Typography variant="body2" color="textSecondary">{`Collection: ${product.collection}`}</Typography>
              <Typography variant="body2" color="textSecondary">{`Quantity: ${product.quantity}`}</Typography>
              <Typography variant="body2" color="textSecondary">{product.description}</Typography>
            </ProductInfo>
            <AddToCartButton onClick={() => handleAddToCart(product)} variant="contained">Add to Cart</AddToCartButton>
          </ProductCard>
        ))}
      </ProductContainer>
    </Container>
  );
}

export default Collection;
