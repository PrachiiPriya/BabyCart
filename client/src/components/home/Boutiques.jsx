import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, styled, Typography } from '@mui/material';
import { boutiquesData } from '../../constants/Data';

const StyledTypography = styled(Typography)({
  textAlign: 'center',
  fontSize: 25,
  marginBottom: 20,
  '@media (max-width: 600px)': {
    fontSize: 20,
  },
});

const Container = styled(Box)`
  background-color: #ccc;
  padding: 65px;

  @media (max-width: 768px) {
    padding: 40px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const BoutiqueContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Image = styled('img')({
  objectFit: 'contain',
  padding: 20,
  textAlign: 'center',
  height: 300,
  width: 300,

  '@media (max-width: 768px)': {
    height: 200,
    width: 200,
  },

  '@media (max-width: 480px)': {
    height: 150,
    width: 150,
  },
});

const ImageContainer = styled(Box)`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-20px);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin: 5px;
  }

  @media (max-width: 480px) {
    margin: 2px;
  }
`;

function Boutiques() {
  const navigate = useNavigate();

  const handleClick = (collection) => {
    navigate(`/boutiques/${collection}`);
  };

  return (
    <Container>
      <StyledTypography>PREMIUM BOUTIQUES</StyledTypography>
      <BoutiqueContainer>
        {boutiquesData.map((data, index) => (
          <ImageContainer key={index} onClick={() => handleClick(data.text)}>
            <Image src={data.url} alt="collection" />
            <Typography>{data.text}</Typography>
          </ImageContainer>
        ))}
      </BoutiqueContainer>
    </Container>
  );
}

export { Boutiques };
