import React from 'react'
import Carousel from 'react-multi-carousel';
import {styled} from '@mui/material';
import 'react-multi-carousel/lib/styles.css';

import { bannerData } from '../../constants/Data';

const Image = styled('img')({
  maxWidth: '100%',
  height: 'auto', 
  objectFit: 'cover',
});


const CarouselItem=styled('div')({
  display:'flex',
  width:'100%',
  height:'100%',
  justifyContent:'center',
  
})


const responsive = {
  
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
export default function Banner() {
  return (
 
    <Carousel responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={3000}
      slidesToSlide={1}
      infinite={true}
      swipeable={false}
      draggable={false}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      containerClass="carousel-container">
    {
      bannerData.map((data,index)=>(
      <CarouselItem key={index}>
        <Image src={data.url} alt='banner'/>
      </CarouselItem>
      )
    )}
    </Carousel>
    
  )
}
