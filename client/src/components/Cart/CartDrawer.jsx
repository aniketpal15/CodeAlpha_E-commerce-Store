import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQty, subtotal, tax, shipping, total, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="overlay" onClick={closeCart} style={{ zIndex: 400 }} />
          <motion.aside
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="drawer-header">
              <div className="drawer-title">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <h2>Your Cart</h2>
                {itemCount > 0 && <span className="badge badge-purple">{itemCount}</span>}
              </div>
              <button className="icon-btn" onClick={closeCart}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Items */}
            <div className="drawer-items">
              {items.length === 0 ? (
                <div className="empty-state" style={{ padding: '60px 20px' }}>
                  <div className="empty-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                  <p>Add some products to get started!</p>
                  <button className="btn btn-primary btn-sm" onClick={closeCart}>Continue Shopping</button>
                </div>
              ) : (
                items.map((item, i) => (
                  <motion.div
                    key={item._id}
                    className="cart-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    layout
                  >
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'}
                      alt={item.name}
                      className="cart-item-img"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'; }}
                    />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                        <span className="qty-value">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item._id)} title="Remove">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="drawer-footer">
                <div className="price-rows">
                  <div className="price-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="price-row"><span>Shipping</span><span>{shipping === 0 ? '🎉 Free' : `$${shipping.toFixed(2)}`}</span></div>
                  <div className="price-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="price-row total"><span>Total</span><span className="price-current">${total.toFixed(2)}</span></div>
                </div>
                {shipping > 0 && (
                  <p className="free-shipping-hint">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <Link to="/checkout" onClick={closeCart} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Proceed to Checkout →
                </Link>
                <Link to="/cart" onClick={closeCart} className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
