import React from 'react';
import { styled, Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#d9f3f4',
  padding: '40px 24px 32px',
  [theme.breakpoints.down('sm')]: {
    padding: '32px 16px 24px',
  },
}));

const Inner = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
}));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: 32,
  fontWeight: 600,
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    marginBottom: 24,
    fontSize: '1.25rem',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 48,
  alignItems: 'start',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: 32,
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    gap: 28,
  },
}));

const Column = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
  },
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.875rem',
  marginBottom: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
  color: '#333',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#1976d2',
  textDecoration: 'none',
  fontSize: '0.875rem',
  marginBottom: 8,
  lineHeight: 1.5,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

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
      <Inner>
        <Title component="h2">big store for little ones</Title>
        <ContentBox>
          <Column>
            <ColumnTitle component="h3">See our collections</ColumnTitle>
            {collections.map((collection) => (
              <StyledLink to={`/boutiques/${collection}`} key={collection}>
                {collection}
              </StyledLink>
            ))}
          </Column>
          <Column>
            <ColumnTitle component="h3">See all clothing items</ColumnTitle>
            {Items.map((item) => (
              <StyledLink to={`/search/${item}`} key={item}>
                {item}
              </StyledLink>
            ))}
          </Column>
        </ContentBox>
      </Inner>
    </StyledBox>
  );
}
