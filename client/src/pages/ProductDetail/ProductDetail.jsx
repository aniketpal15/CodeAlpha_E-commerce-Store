import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProduct, addReview } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import toast from 'react-hot-toast';
import './ProductDetail.css';

function StarRating({ rating, interactive = false, onRate }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="stars" style={{ gap: '4px' }}>
      {[1,2,3,4,5].map(n => (
        <svg
          key={n}
          width={interactive ? 24 : 14}
          height={interactive ? 24 : 14}
          viewBox="0 0 24 24"
          fill={n <= (hover || Math.round(rating)) ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className={n <= (hover || Math.round(rating)) ? 'star-filled' : 'star-empty'}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate && onRate(n)}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [selImg, setSelImg]       = useState(0);
  const [qty, setQty]             = useState(1);
  const [tab, setTab]             = useState('description');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText]     = useState('');
  const [submitting, setSubmitting]     = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await fetchProduct(id);
        setProduct(data);
      } catch {
        toast.error('Product not found');
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to review'); return; }
    setSubmitting(true);
    try {
      await addReview(id, { rating: reviewRating, comment: reviewText });
      toast.success('Review submitted!');
      setReviewText('');
      setReviewRating(5);
      const { data } = await fetchProduct(id);
      setProduct(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const fallback = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600';

  if (loading) {
    return (
      <div style={{ paddingTop: 'calc(var(--nav-h) + 40px)' }} className="container">
        <div className="pd-skeleton">
          <div className="skeleton" style={{ aspectRatio: '1', borderRadius: 'var(--radius-lg)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[80, 60, 40, 40, 100, 100, 60].map((w, i) => (
              <div key={i} className="skeleton" style={{ height: i === 4 || i === 5 ? '50px' : '20px', width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail" style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <Link to={`/shop?category=${product.category}`}>{product.category}</Link> / <span>{product.name}</span>
        </nav>

        {/* ── Main Grid ── */}
        <div className="pd-grid">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-main-img-wrap">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selImg}
                  src={product.images?.[selImg] || fallback}
                  alt={product.name}
                  className="pd-main-img"
                  onError={e => { e.target.src = fallback; }}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              {discount > 0 && <span className="badge badge-red pd-discount">-{discount}%</span>}
            </div>
            {product.images?.length > 1 && (
              <div className="pd-thumbnails">
                {product.images.map((img, i) => (
                  <button key={i} className={`pd-thumb${selImg === i ? ' active' : ''}`} onClick={() => setSelImg(i)}>
                    <img src={img} alt={`View ${i+1}`} onError={e => { e.target.src = fallback; }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <div className="pd-brand">{product.brand}</div>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-rating-row">
              <StarRating rating={product.rating} />
              <span className="pd-review-count">{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
            </div>

            <div className="pd-price-row">
              <span className="price-current" style={{ fontSize: '2rem' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="price-original" style={{ fontSize: '1.1rem' }}>${product.originalPrice.toFixed(2)}</span>
                  <span className="price-discount">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className={`pd-stock${product.stock > 0 ? ' in-stock' : ' out-stock'}`}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
            </div>

            {/* Qty */}
            {product.stock > 0 && (
              <div className="pd-qty-row">
                <span className="qty-label">Quantity</span>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span className="qty-value">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pd-actions">
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart} disabled={product.stock === 0}>
                🛒 Add to Cart
              </button>
              <button className="btn btn-outline btn-lg" onClick={handleBuyNow} disabled={product.stock === 0}>
                ⚡ Buy Now
              </button>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="pd-tags">
                {product.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            )}

            {/* Guarantees */}
            <div className="pd-guarantees">
              {['🚀 Fast Delivery', '🛡️ 2-Year Warranty', '↩️ 30-Day Returns', '🔒 Secure Payment'].map(g => (
                <div key={g} className="pd-guarantee">{g}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="pd-tabs">
          <div className="tab-buttons">
            {[['description','Description'],['specs','Specifications'],['reviews','Reviews']].map(([k, l]) => (
              <button key={k} className={`tab-btn${tab === k ? ' active' : ''}`} onClick={() => setTab(k)}>
                {l} {k === 'reviews' && `(${product.numReviews})`}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              className="tab-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'description' && (
                <p className="pd-description">{product.description}</p>
              )}

              {tab === 'specs' && (
                <div className="pd-specs">
                  <div className="spec-row"><span>Brand</span><span>{product.brand}</span></div>
                  <div className="spec-row"><span>Category</span><span>{product.category}</span></div>
                  <div className="spec-row"><span>Stock</span><span>{product.stock} units</span></div>
                  {product.specs && [...product.specs.entries()].map(([k,v]) => (
                    <div key={k} className="spec-row"><span>{k}</span><span>{v}</span></div>
                  ))}
                </div>
              )}

              {tab === 'reviews' && (
                <div className="pd-reviews">
                  {/* Review form */}
                  {user && (
                    <form className="review-form card" onSubmit={handleReview}>
                      <h4>Write a Review</h4>
                      <div className="form-group">
                        <label className="form-label">Your Rating</label>
                        <StarRating rating={reviewRating} interactive onRate={setReviewRating} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Comment</label>
                        <textarea
                          className="form-input"
                          rows={4}
                          placeholder="Share your experience..."
                          value={reviewText}
                          onChange={e => setReviewText(e.target.value)}
                          required
                        />
                      </div>
                      <button className="btn btn-primary" type="submit" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  )}

                  {/* Reviews List */}
                  {product.reviews.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">💬</div>
                      <h3>No reviews yet</h3>
                      <p>Be the first to review this product!</p>
                    </div>
                  ) : (
                    <div className="reviews-list">
                      {product.reviews.map(r => (
                        <div key={r._id} className="review-item card">
                          <div className="review-header">
                            <div className="review-avatar">{r.name[0]}</div>
                            <div>
                              <strong>{r.name}</strong>
                              <div className="review-date">{new Date(r.createdAt).toLocaleDateString()}</div>
                            </div>
                            <StarRating rating={r.rating} />
                          </div>
                          <p className="review-text">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
