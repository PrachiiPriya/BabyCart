import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useData } from "../../../context/DataProvider";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/cartActions";

const FilterProd = () => {
  const { account } = useData(); // Get account from context
  const [filters, setFilters] = useState({
    category: [],
    discount: [],
    price: [],
    age: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [shortlist, setShortlist] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log("Fetched products:", data);
      setAllProducts(data || []);
      setFilteredProducts(data || []); // Initialize filteredProducts with fetched data
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    filterProducts();
  }, [filters, allProducts]); // Re-run filtering when filters or allProducts change

  const filterProducts = () => {
    let filtered = allProducts;

    console.log("Initial products:", filtered);
    console.log("Filters:", filters);

    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category.toLowerCase())
      );
      console.log("After category filter:", filtered);
    }

    if (filters.discount.length > 0) {
      filtered = filtered.filter((product) =>
        filters.discount.includes(product.discount.replace('% OFF', '').trim())
      );
      console.log("After discount filter:", filtered);
    }

    if (filters.price.length > 0) {
      filtered = filtered.filter((product) => {
        const priceRanges = filters.price.map((range) =>
          range.split("-").map(Number)
        );
        return priceRanges.some(([min, max]) => {
          const discountedPrice = calculateDiscountedPrice(
            product.price,
            product.discount
          );
          console.log(`Price ${discountedPrice} for range ${min}-${max}`);
          if (max) {
            return discountedPrice >= min && discountedPrice <= max;
          } else {
            return discountedPrice >= min;
          }
        });
      });
      console.log("After price filter:", filtered);
    }

    if (filters.age.length > 0) {
      filtered = filtered.filter((product) =>
        filters.age.includes(product.age?.toString())
      );
      console.log("After age filter:", filtered);
    }

    setFilteredProducts(filtered);
  };

  const handleCheckboxChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: prevFilters[key].includes(value.toLowerCase())
        ? prevFilters[key].filter((val) => val !== value.toLowerCase())
        : [...prevFilters[key], value.toLowerCase()],
    }));
  };

  const handleAddToCart = (product) => {
    const id = product.id; 
    if (account) { // Check if account exists
      const discountedPrice = calculateDiscountedPrice(
        product.price,
        product.discount
      );
      dispatch(addToCart(id, quantity));
      navigate('/cart');
    } else {
      toast.info("Please log in to add items to the cart.");
    }
  };

  const handleShortlist = (product) => {
    setShortlist((prevShortlist) => [...prevShortlist, product]);
    toast.info(`${product.title} has been shortlisted!`);
  };

  const calculateDiscountedPrice = (priceStr, discountStr) => {
    // Clean the price and discount strings
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    const discount = parseFloat(discountStr.replace(/[^0-9.]/g, ''));
    
    // Return the discounted price
    return isNaN(price) || isNaN(discount)
      ? 0
      : price - (price * discount) / 100;
  };

  return (
    <div className="product-page">
      <div className="filters">
        <div className="filter-section">
          <h3>Category</h3>
          {['Boy Fashion', 'Girl Fashion', 'Footwear', 'Toys', 'Accessories', 'Bath', 'Moms'].map((category) => (
            <div key={category}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('category', category)}
                />
                {category}
              </label>
            </div>
          ))}
        </div>

        <div className="filter-section">
          <h3>Discount</h3>
          {['10', '20', '30', '40', '50', '60', '70', '80'].map((discount) => (
            <div key={discount}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('discount', discount)}
                />
                {discount}% off
              </label>
            </div>
          ))}
        </div>

        <div className="filter-section">
          <h3>Price Range</h3>
          {['0-250', '250-500', '500-1000', '1000-1500', '1500-'].map((range) => (
            <div key={range}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('price', range)}
                />
                {range.replace('-', ' and more if no max')}
              </label>
            </div>
          ))}
        </div>

        <div className="filter-section">
          <h3>Age</h3>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'].map((age) => (
            <div key={age}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('age', age)}
                />
                {age} years
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.url} alt={product.title} />
              <h3>{product.title}</h3>
              <div className="price">
                <span className="discounted-price">
                  Rs {calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                </span>
                <span className="original-price">
                  Rs {parseFloat(product.price.replace(/[^0-9.]/g, '')).toFixed(2)}
                </span>
                <span className="discount-percentage">
                  ({product.discount})
                </span>
              </div>
              <p>Age: {product.age ? `${product.age} years` : 'N/A'}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button onClick={() => handleShortlist(product)}>Shortlist</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default FilterProd;
