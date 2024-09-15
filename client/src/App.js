import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/home/Home';
import { Boutiques } from './components/home/Boutiques';
import Collection from './components/Collection'; 
import FilterProd from './components/Header/filter/FilterProd';
import { Box } from '@mui/material';
import DataProvider from './context/DataProvider';
import SearchAns from './SearchAns';
import ProductPage from './components/Header/filter/ProductPage';
import Cart from './components/cart/Cart';

function App() {
  return (
    <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <Box style={{ marginTop: 70 }}>
                  <Home />
                </Box>
              </>
            } />
            <Route path="/boutiques" element={<Boutiques />} />
            <Route path="/boutiques/:collection" element={<Collection />} />  
            <Route path="/search/:query" element={<SearchAns />} />
            <Route path="/filter" element={<FilterProd />} />
            <Route path="/cart" element={<Cart/>}/>
            {/* <Route path="/products" element={<ProductPage />} /> */}
          </Routes>
        </BrowserRouter>
        </DataProvider>
  );
}

export default App;
