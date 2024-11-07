import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faShoppingCart, 
  faHeart, 
  faRupeeSign,
  faCopyright
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faInstagram, 
  faLinkedin, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import SearchBar from "../search/SearchBar";
import { getProducts } from '../apis/ProductApis';
import LoginRegister from '../loginRegister/LoginRegister';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [Error, setError] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleNavigateToLogin = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal(); // Close modal and navigate home when clicking outside modal content
    }
  };

  return (
    <>
      <div className='home-container'>
        <div className='home-header'>
          <h2 className='logo'>Ayurv <span className='logo1'>Liquids</span></h2>
          <SearchBar 

            handleChange={handleSearchChange} 
            handleSubmit={handleSearchSubmit} 
          />
          <div className='hsf'>
            <button aria-label='Add to Favorites' onClick={handleNavigateToLogin}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button aria-label='Go to Cart' onClick={handleNavigateToLogin}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
            <button aria-label='User Login' onClick={handleNavigateToLogin}>
              <FontAwesomeIcon icon={faUser} /> Login
            </button>
          </div>
        </div>

        <nav className="home-navbar">
          <ul>
            <li>Healthy Juices</li>
            <li>Fruit Juices</li>
            <li>Mocktails</li>
            <li>Tea Coop</li>
          </ul>
        </nav>

        <div className="home-productsList">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className='product-card'>
                <div className='favo'>
                  <div className='add-to-fav' onClick={handleNavigateToLogin}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
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
                  <button className='add-to-cart-btn' onClick={handleNavigateToLogin}>Add to Cart</button>
                </div>
              </div>
            ))
          ) : (
            <p className='no-products'>No products found.</p>
          )}
        </div>

        <footer>
          <h3 className='social-header'>Follow Us:</h3>
          <ul className='social-media-links' aria-label="Social Media Links">
            <li className='social-media-links'>
              <Link to="https://www.facebook.com/" aria-label="Follow us on Facebook">
                <FontAwesomeIcon icon={faFacebook} size='2x' />
              </Link>
            </li>
            <li className='social-media-links'>
              <Link to='https://www.instagram.com/' aria-label="Follow us on Instagram">
                <FontAwesomeIcon icon={faInstagram} size='2x' />
              </Link>
            </li>
            <li className='social-media-links'>
              <Link to='https://www.linkedin.com/feed/' aria-label="Follow us on LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} size='2x' />
              </Link>
            </li>
            <li className='social-media-links'>
              <Link to='https://www.youtube.com/' aria-label="Follow us on YouTube">
                <FontAwesomeIcon icon={faYoutube} size='2x' />
              </Link>
            </li>
          </ul>
          <div className='footer-Menu'>
            <p className='footer-p'>Shop by Keyword:</p>
            <ul className='footer-Menu'>
              <li className='footer-Menu'><Link to='/sandwich'>Sandwich</Link></li>
              <li className='footer-Menu'><Link to='/coldpress'>Cold Press Juices</Link></li>
              <li className='footer-Menu'><Link to="/teacoop">Green Tea</Link></li>
              <li className='footer-Menu'><Link to='/herbs'>Herbs & Spices</Link></li>
              <li className='footer-Menu'><Link to="/Healthy">Aloe Vera Juice</Link></li>
              <li className='footer-Menu'><Link to="/Healthy">Healthy Juices</Link></li>
              <li className='footer-Menu'><Link to='/mocktails'>Mocktails</Link></li>
            </ul>
          </div>
          <div className='copyright'>
            <FontAwesomeIcon icon={faCopyright} />
            <span> 2024 Ayurv Liquids. All rights reserved.</span>
          </div>
        </footer>

        {showModal && (
          <div className='modal-background' onClick={handleModalClick}>
            <div className='modal-content'>
              <LoginRegister closeModal={closeModal} />
            </div>
          </div>
        )}
      </div> 
    </>
  );
}

export default Home;
