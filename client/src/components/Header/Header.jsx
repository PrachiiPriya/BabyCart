import React from 'react'
import {AppBar,Toolbar,styled,Box} from '@mui/material'
import { pink } from '@mui/material/colors'

//Components
import Search from './Search';
import Custombutton from './Custombutton';

const StyledHeader = styled(AppBar)`
  background-color: ${pink[500]};
`;

export default function Header() {
  return (
    <StyledHeader>
      <Toolbar>
        <Box>
          <img src='https://cdn.fcglcdn.com/brainbees/images/n/fc_logo.png' alt='logo'/>
        </Box>
        <Search/>
        <Box>
          <Custombutton/>
        </Box>
      </Toolbar>
    </StyledHeader>
  )
}
