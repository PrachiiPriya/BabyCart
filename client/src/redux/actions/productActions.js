
import axios from "axios";
import * as actionTypes from '../constants/productConstant'

export const getProducts = () => async(dispatch) => {
  try{
    let { data } = await axios.get('http://localhost:8000/api/boutiques/products');
    
    dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload:data })
  } catch(error) {
    dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message })
  }
}