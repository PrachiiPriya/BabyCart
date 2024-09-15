import { InputBase, Box, styled } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled(Box)`
  background-color: #FFFFFF;
  width: 25%;
  display: flex;
  border-radius: 2px;
  margin-left: 10px;

  @media (max-width: 960px) {
    width: 40%;
  }

  @media (max-width: 600px) {
    width: 60%;
    margin-left: 0;
  }
`;

const InputSearchBase = styled(InputBase)`
  width: 100%;
  padding-right: 20px;
  font-size: unset;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

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
