import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOrder } from '../../services/api';
import './OrderSuccess.css';

const STATUS_STEPS = ['pending', 'processing', 'shipped', 'delivered'];

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder(id).then(r => setOrder(r.data)).catch(console.error);
  }, [id]);

  const currentStep = STATUS_STEPS.indexOf(order?.status || 'pending');

  return (
    <div className="success-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container success-container">
        <motion.div
          className="success-card card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 360] }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          >
            🎉
          </motion.div>
          <h1 className="success-title">Order Placed!</h1>
          <p className="success-sub">Thank you for your purchase. Your order has been confirmed.</p>
          {order && (
            <div className="success-order-id">
              Order ID: <strong>#{order._id.slice(-8).toUpperCase()}</strong>
            </div>
          )}
        </motion.div>

        {/* Tracking Timeline */}
        {order && (
          <motion.div
            className="tracking-card card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="tracking-title">Order Status</h2>
            <div className="tracking-timeline">
              {[
                { key: 'pending',    icon: '📋', label: 'Order Placed',    desc: 'We have received your order' },
                { key: 'processing', icon: '⚙️', label: 'Processing',      desc: 'Preparing your items' },
                { key: 'shipped',    icon: '🚚', label: 'Shipped',         desc: 'On the way to you' },
                { key: 'delivered',  icon: '✅', label: 'Delivered',       desc: 'Package delivered' },
              ].map((s, i) => (
                <div key={s.key} className={`timeline-step${i <= currentStep ? ' done' : ''}${i === currentStep ? ' current' : ''}`}>
                  <div className="timeline-icon">{s.icon}</div>
                  <div className="timeline-info">
                    <strong>{s.label}</strong>
                    <span>{s.desc}</span>
                  </div>
                  {i < 3 && <div className="timeline-connector" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Order Summary */}
        {order && (
          <motion.div
            className="order-summary-card card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="tracking-title">Order Details</h2>
            <div className="order-items-list">
              {order.items.map((item, i) => (
                <div key={i} className="order-item-row">
                  <img src={item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80'} alt={item.name} className="order-item-img" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80'; }} />
                  <div className="order-item-info">
                    <span>{item.name}</span>
                    <span style={{ color: 'var(--clr-text-3)', fontSize: '0.8rem' }}>× {item.qty}</span>
                  </div>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="order-total-row"><span>Total Paid</span><span className="price-current">${order.totalPrice.toFixed(2)}</span></div>
            </div>
          </motion.div>
        )}

        <div className="success-actions">
          <Link to="/orders" className="btn btn-outline">View My Orders</Link>
          <Link to="/shop" className="btn btn-primary">Continue Shopping →</Link>
        </div>
      </div>
    </div>
  );
}
