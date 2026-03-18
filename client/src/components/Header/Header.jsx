import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  styled,
  Box,
  IconButton,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { pink } from '@mui/material/colors';

//Components
import Search from './Search';
import Custombutton from './Custombutton';

const StyledHeader = styled(AppBar)`
  background-color: ${pink[500]};
`;

const LogoLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  '& .brand-accent': {
    fontWeight: 400,
    opacity: 0.9,
    fontSize: '0.85em',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}));

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <StyledHeader position="fixed">
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1.5, sm: 3 },
          gap: { xs: 1, md: 3 },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto', minWidth: 0 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 0.5 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <LogoLink to="/" aria-label="BabyCart home">
            <LogoText component="span">
              Baby<span className="brand-accent">Care</span>
            </LogoText>
          </LogoLink>
        </Box>
        <Box
          sx={{
            flex: '1 1 auto',
            order: { xs: 3, md: 0 },
            width: { xs: '100%', md: 'auto' },
            maxWidth: { md: 480 },
            mx: { xs: 0, md: 2 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search />
        </Box>
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Custombutton />
          </Box>
        )}
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 'min(320px, 100vw)', pt: 2 },
        }}
      >
        <Box sx={{ px: 2 }}>
          <Custombutton onCloseDrawer={() => setDrawerOpen(false)} />
        </Box>
      </Drawer>
    </StyledHeader>
  );
}
