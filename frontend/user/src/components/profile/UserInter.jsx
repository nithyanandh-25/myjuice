import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faShoppingCart, faHeart, faRupeeSign, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import SearchBar from "../search/SearchBar";
import Cart from '../cart/cart';
import { getProducts } from '../apis/ProductApis';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../cart/cartSlice';

function UserInter({ userId }) { // Pass userId as a prop
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  // Add product to cart with userId
  const handleAddToCart = (product) => {
    dispatch(addToCart({ userId, product }));
    alert(`${product.name} added to cart`);
  };

  // Manage search bar inputs
  const handleSearchChange = (e) => setQuery(e.target.value);

  const handleNavigateToCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  return (
    <div className='home-container'>
      <div className='home-header'>
        <h2 className='logo'>Ayurv <span className='logo1'>Liquids</span></h2>
        <SearchBar handleChange={handleSearchChange} />
        <div className='hsf' ref={dropdownRef}>
          <button aria-label='Add to Favorites'>
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button aria-label='Go to Cart' onClick={handleNavigateToCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <button aria-label='User Login' onClick={() => setShowDropdown(!showDropdown)}>
            Profile <FontAwesomeIcon icon={faAngleDown} />
          </button>
          {showDropdown && (
            <ul className='profile-dropdown'>
              <li><Link to='/myprofile'>My Profile</Link></li>
              <li><Link to='/orders'>My Orders</Link></li>
              <li><Link to='/settings'>Settings</Link></li>
              <li><Link to='/'>Logout</Link></li>
            </ul>
          )}
        </div>
      </div>
      
      <div className="home-productsList">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className='product-card'>
              <div className='favo'>
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name}
                className="product-table-image"
                style={{ width: 50 }}
              />
              <div className='product-details'>
                <h4 className='product-name'>{product.name}</h4>
                <p className='product-quantity'>{product.quantity}</p>
                <p className='product-price'>
                  <FontAwesomeIcon icon={faRupeeSign} /> {product.price}
                </p>
                <button className='add-to-cart-btn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p className='no-products'>No products found.</p>
        )}
      </div>

      <Cart userId={userId} closeCart={closeCart} showCart={showCart} />

      <footer>
        <h3 className='social-header'>Follow Us:</h3>
        <ul className='social-media-links'>
          <li><Link to="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} size='2x' /></Link></li>
          <li><Link to='https://www.instagram.com/'><FontAwesomeIcon icon={faInstagram} size='2x' /></Link></li>
          <li><Link to='https://www.linkedin.com/feed/'><FontAwesomeIcon icon={faLinkedin} size='2x' /></Link></li>
          <li><Link to='https://www.youtube.com/'><FontAwesomeIcon icon={faYoutube} size='2x' /></Link></li>
        </ul>
        <div className='footer-Menu'>
          <ul>
            <li><Link to='/sandwich'>Sandwich</Link></li>
            <li><Link to='/coldpress'>Cold Press Juices</Link></li>
            <li><Link to="/teacoop">Green Tea</Link></li>
            <li><Link to='/herbs'>Herbs & Spices</Link></li>
          </ul>
        </div>
        <div className='copyright'>
          <FontAwesomeIcon icon={faCopyright} />
          <span> 2024 Ayurv Liquids. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default UserInter;
