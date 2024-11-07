import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../cart/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign, faXmark, faPlus, faMinus, faTrashRestoreAlt } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';

function Cart({ userId, closeCart, showCart }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart[userId] || []);

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity({ userId, productId }));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ userId, productId }));
  };

  const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    showCart && (
      <div className="cart-overlay" onClick={closeCart}>
        <div className={`cart-panel ${showCart ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2 className="cart-title">Your Cart</h2>
            <button className="close-cart" onClick={closeCart} aria-label="Close cart">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart-message">
                <p>Your cart is empty.</p>
                <button className="return-to-shop-btn" onClick={closeCart}>Return to Shop</button>
              </div>
            ) : (
              cart.map((product) => (
                <div key={product.id} className="cart-item">
                  <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{product.name}</h4>
                    <p className="cart-item-price"><FontAwesomeIcon icon={faRupeeSign} /> {product.price}</p>
                    <div className="quantity-controls">
                      <button className="quantity-button decrease" aria-label="Decrease quantity" onClick={() => handleDecrement(product.id)}>-</button>
                      <span className="quantity-display">{product.quantity}</span>
                      <button className="quantity-button increase" aria-label="Increase quantity" onClick={() => handleIncrement(product.id)}>+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="cart-footer">
              <p className="total-price">Total: <FontAwesomeIcon icon={faTrashRestoreAlt} /> {totalPrice}</p>
              <button className="checkout-btn" onClick={() => alert('Proceeding to Checkout...')}>Checkout</button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default Cart;
