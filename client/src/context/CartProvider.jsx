import React, { createContext, useReducer, useContext } from 'react';
import { cartReducer } from './reducers/cartReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a Context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] });

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        toast.success(`${product.title} has been added to the cart!`);
    };

    return (
        <CartContext.Provider value={{ state, addToCart }}>
            {children}
            <ToastContainer />
        </CartContext.Provider>
    );
};

// Create a custom hook for using the context
export const useCart = () => {
    return useContext(CartContext);
};
