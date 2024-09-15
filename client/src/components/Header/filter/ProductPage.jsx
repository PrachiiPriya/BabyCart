import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from '../../../context/DataProvider';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const ProductPage = ({ products }) => {
    const { account } = useContext(DataContext);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        category: [],
        discount: [],
        price: [],
        age: []
    });

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            let filtered = products;

            if (filters.category.length > 0) {
                filtered = filtered.filter(product => filters.category.includes(product.category));
            }

            if (filters.discount.length > 0) {
                filtered = filtered.filter(product => filters.discount.includes(product.discount.toString()));
            }

            if (filters.price.length > 0) {
                filtered = filtered.filter(product => {
                    const priceRanges = filters.price.map(range => range.split('-').map(Number));
                    return priceRanges.some(([min, max]) => {
                        const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
                        if (max) {
                            return discountedPrice >= min && discountedPrice <= max;
                        } else {
                            return discountedPrice >= min;
                        }
                    });
                });
            }

            if (filters.age.length > 0) {
                filtered = filtered.filter(product => filters.age.includes(product.age));
            }

            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [products, filters]);

    const calculateDiscountedPrice = (price, discount) => {
        const priceNumber = parseFloat(price.replace('Rs.', '').trim());
        const discountNumber = parseFloat(discount.replace('% OFF', '').trim());
        return priceNumber - (priceNumber * discountNumber / 100);
    };

    const handleFilterChange = (type, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [type]: prevFilters[type].includes(value)
                ? prevFilters[type].filter(item => item !== value)
                : [...prevFilters[type], value]
        }));
    };

    const handleAddToCart = (product) => {
        if (account) {
            navigate('/cart')
        } else {
            toast.info('Login to add items to the cart.');
        }
    };

    return (
        <div className="product-page">
            <div className="filter-container">
                <div className="filter-section">
                    <h3>Category</h3>
                    {['Boy Fashion', 'Girl Fashion', 'Footwear', 'Toys', 'Accessories', 'Bath', 'Moms'].map(category => (
                        <div key={category}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={() => handleFilterChange('category', category)}
                                />
                                {category}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="filter-section">
                    <h3>Discount</h3>
                    {['10', '20', '30', '40', '50', '60', '70', '80'].map(discount => (
                        <div key={discount}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={() => handleFilterChange('discount', discount)}
                                />
                                {discount}% off
                            </label>
                        </div>
                    ))}
                </div>

                <div className="filter-section">
                    <h3>Price Range</h3>
                    {['0-250', '250-500', '500-1000', '1000-1500', '1500-'].map(range => (
                        <div key={range}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={() => handleFilterChange('price', range)}
                                />
                                {range}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="filter-section">
                    <h3>Age</h3>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'].map(age => (
                        <div key={age}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={() => handleFilterChange('age', age)}
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
                                <span className="discounted-price">Rs {calculateDiscountedPrice(product.price, product.discount).toFixed(2)}</span>
                                <span className="original-price">Rs {parseFloat(product.price.replace('Rs.', '').trim()).toFixed(2)}</span>
                                <span className="discount-percentage">({product.discount})</span>
                            </div>
                            <p>Age: {product.age ? `${product.age} years` : 'N/A'}</p>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
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

export default ProductPage;
