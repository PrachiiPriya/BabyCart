import React from 'react'
import { styled, Box} from '@mui/system'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledBox=styled(Box)`
background-color:#d9f3f4;
padding: 20px;
`;

const ContentBox=styled(Box)`
display: flex;
flex-direction: row;
justify-content: space-around;
 align-items: flex-start;
  align-items: center;
  margin: 10px;
`;

const CollectionBox=styled(Box)`
display:flex;
flex-direction:column;

`;
const ItemBox=styled(Box)`
display:flex;
flex-direction:column;
margin-top: -100px;
`;

const collections = [
  'Its Raining Its Pouring',
  'Collection Featuring Disney and Marvel',
  'Couture Cuteness Collection',
  'Moonlight Pajama Parade',
  'Accessory Adventure',
  'Top Home Deals',
  'Magical Collection',
  'Baby Blossom Bash',
  'Footwear Fiesta'
];
const Items =[
  'T-Shirt',
  'Frock',
  'Sneakers',
  'Shorts'
]

export default function Footer() {
  return (
    <StyledBox>
        <Typography variant="h4" style={{ textAlign: 'center' }}>big store for little ones</Typography>
        <ContentBox>
          <CollectionBox>
            <Typography variant="h6">SEE OUR COLLECTIONS:</Typography>
            {collections.map((collection) => (
              <Link to={`/boutiques/${collection}`} key={collection}>
                {collection}
              </Link>
            ))}
          </CollectionBox>
          <ItemBox>
            <Typography variant="h6">SEE ALL CLOTHING ITEMS :</Typography>
            {Items.map((item) => (
              <Link to={`/search/${item}`} key={item}>
                {item}
              </Link>
            ))}
          </ItemBox>
        </ContentBox>
      </StyledBox>
  )
}
