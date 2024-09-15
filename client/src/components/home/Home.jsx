import React from 'react'

//Component imports
import Navbar from './Navbar'
import Banner from './Banner'
import { Boutiques } from './Boutiques';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions/productActions'
import { useDispatch, useSelector} from 'react-redux';

export default function Home() {

  const dispatch = useDispatch();

  useSelector(state => state.getProducts);
  useSelector(state => state.cart);
  
  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch])

  return (
    <>
      <Navbar/>
      <Banner/>
      <Boutiques/>
      <Footer/>
    </>
  )
}
