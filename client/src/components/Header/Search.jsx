import { InputBase, Box, styled } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 4,
  marginLeft: 10,
  width: '100%',
  minHeight: 40,
  maxHeight: 40,
  '& .MuiInputBase-root': {
    height: '100%',
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
  [theme.breakpoints.down('600px')]: {
    minHeight: 36,
    maxHeight: 36,
  },
}));

const InputSearchBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  paddingRight: 12,
  paddingLeft: 12,
  fontSize: '0.875rem',
  [theme.breakpoints.down('600px')]: {
    fontSize: 14,
  },
}));

const SearchIconWrapper = styled(SearchIcon)`
  color: ${pink[500]};
  cursor: pointer;
`;

export default function Search() {
  const [item, setItem] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setItem(e.target.value);
    console.log(item);
  }

  const submitHandler = () => {
    navigate(`/search/${item}`);
  };

  return (
    <SearchContainer>
      <InputSearchBase
        onChange={changeHandler}
        placeholder="Search for a category, brand, or product."
        name="searchItem"
      />
      <SearchIconWrapper onClick={submitHandler}>
        <SearchIcon />
      </SearchIconWrapper>
    </SearchContainer>
  )
}
