import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag, FiShield, FiTruck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { items, removeFromCart, updateQty, subtotal, tax, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-page empty-cart-page container">
        <motion.div 
          className="empty-cart-card glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="empty-cart-icon"><FiShoppingBag /></div>
          <h2>Your Cart is Empty</h2>
          <p>Explore our cutting-edge tech catalog and find your next favorite device.</p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Start Shopping <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div 
                key={item._id}
                className="cart-item-card glass"
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <span className="cart-item-cat">{item.category}</span>
                  <Link to={`/shop/${item._id}`} className="cart-item-title">{item.name}</Link>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                </div>

                <div className="qty-controls">
                  <button onClick={() => updateQty(item._id, item.qty - 1)} aria-label="Decrease quantity"><FiMinus /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)} aria-label="Increase quantity"><FiPlus /></button>
                </div>

                <div className="cart-item-total">
                  ${(item.price * item.qty).toFixed(2)}
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                  aria-label="Remove item"
                >
                  <FiTrash2 />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="cart-perks">
            <div className="perk-item">
              <FiTruck /> Free Shipping on Orders Over $100
            </div>
            <div className="perk-item">
              <FiShield /> 2-Year Official Nexa Guarantee
            </div>
          </div>
        </div>

        <div className="cart-summary-card glass">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span>{shipping === 0 ? <span className="free-tag">FREE</span> : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Total</span>
            <span className="total-amount">${total.toFixed(2)}</span>
          </div>

          <button 
            className="btn btn-primary btn-full checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <FiArrowRight />
          </button>

          <Link to="/shop" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
