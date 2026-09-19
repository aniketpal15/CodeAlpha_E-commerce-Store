import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(n => (
        <svg key={n} width="12" height="12" viewBox="0 0 24 24" fill={n <= Math.round(rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={n <= Math.round(rating) ? 'star-filled' : 'star-empty'}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

const BADGE_CLASSES = {
  'Best Seller': 'badge-purple',
  'New':         'badge-cyan',
  'Sale':        'badge-gold',
  'Hot':         'badge-red',
  'Pro':         'badge-purple',
  'Premium':     'badge-purple',
  'Popular':     'badge-cyan',
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [imgIdx, setImgIdx] = useState(0);
  const [wished, setWished] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const fallback = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400';

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      {/* Image */}
      <Link to={`/shop/${product._id}`} className="product-img-wrap">
        <motion.img
          src={product.images?.[imgIdx] || fallback}
          alt={product.name}
          className="product-img"
          onError={e => { e.target.src = fallback; }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => product.images?.length > 1 && setImgIdx(1)}
          onMouseLeave={() => setImgIdx(0)}
        />
        {/* Badges */}
        <div className="product-badges">
          {product.badge && (
            <span className={`badge ${BADGE_CLASSES[product.badge] || 'badge-purple'}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="badge badge-red">-{discount}%</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          className={`wishlist-btn${wished ? ' wished' : ''}`}
          onClick={e => { e.preventDefault(); setWished(v => !v); }}
          title="Add to wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        {/* Out of stock */}
        {product.stock === 0 && <div className="out-of-stock">Out of Stock</div>}
      </Link>

      {/* Info */}
      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <Link to={`/shop/${product._id}`} className="product-name">{product.name}</Link>
        <div className="product-meta">
          <div className="product-rating">
            <StarRating rating={product.rating} />
            <span className="review-count">({product.numReviews})</span>
          </div>
        </div>
        <div className="product-pricing">
          <span className="price-current">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="price-original">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button
          className="btn btn-primary add-to-cart-btn"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
}
