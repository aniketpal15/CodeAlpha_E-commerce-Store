import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMyOrders } from '../../services/api';
import './Orders.css';

const STATUS_COLORS = {
  pending:    'badge-gold',
  processing: 'badge-cyan',
  shipped:    'badge-purple',
  delivered:  'badge-green',
  cancelled:  'badge-red',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then(r => setOrders(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ paddingTop: 'calc(var(--nav-h) + 40px)' }} className="container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '40px' }}>
        {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '120px', borderRadius: '16px' }} />)}
      </div>
    </div>
  );

  return (
    <div className="orders-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container">
        <div className="orders-header">
          <h1 className="section-title">My Orders</h1>
          <Link to="/shop" className="btn btn-outline btn-sm">Continue Shopping</Link>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No orders yet</h3>
            <p>Your order history will appear here after you make a purchase.</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping →</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, i) => (
              <motion.div
                key={order._id}
                className="order-card card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="order-card-header">
                  <div className="order-meta">
                    <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                    <span className="order-date">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <span className={`badge ${STATUS_COLORS[order.status] || 'badge-purple'}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="order-items-preview">
                  {order.items.slice(0, 3).map((item, j) => (
                    <div key={j} className="order-preview-item">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60'}
                        alt={item.name}
                        className="order-preview-img"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60'; }}
                      />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="order-preview-more">+{order.items.length - 3}</div>
                  )}
                </div>

                <div className="order-card-footer">
                  <div className="order-info">
                    <span>{order.items.reduce((a, i) => a + i.qty, 0)} items</span>
                    <span className="price-current">${order.totalPrice.toFixed(2)}</span>
                  </div>
                  <Link to={`/order-success/${order._id}`} className="btn btn-outline btn-sm">
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
