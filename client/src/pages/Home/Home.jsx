import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchFeatured, fetchProducts } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import Hero3D from '../../components/Hero3D/Hero3D';
import './Home.css';

const CATEGORIES = [
  { name: 'Electronics', icon: '💻', color: '#8b5cf6' },
  { name: 'Fashion',     icon: '👗', color: '#ec4899' },
  { name: 'Sports',      icon: '⚡', color: '#f59e0b' },
  { name: 'Beauty',      icon: '✨', color: '#06b6d4' },
  { name: 'Home',        icon: '🏠', color: '#10b981' },
  { name: 'Gaming',      icon: '🎮', color: '#f43f5e' },
  { name: 'Books',       icon: '📚', color: '#8b5cf6' },
  { name: 'Accessories', icon: '👜', color: '#f59e0b' },
];

const STATS = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '10K+', label: 'Products' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [email, setEmail]       = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [featRes, trendRes] = await Promise.all([
          fetchFeatured(),
          fetchProducts({ sort: 'popular', limit: 4 }),
        ]);
        setFeatured(featRes.data);
        setTrending(trendRes.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    alert('Thanks for subscribing! 🎉');
    setEmail('');
  };

  return (
    <div className="home">
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero-section">
        <div className="hero3d-bg">
          <Hero3D />
        </div>
        <div className="container hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="hero-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ✦ New Season 2026 Collection
            </motion.span>
            <h1 className="hero-title">
              Shop the Future
              <br />
              <span className="hero-gradient-text">One Click</span> at a Time
            </h1>
            <p className="hero-subtitle">
              Discover thousands of premium products from the world's best brands. 
              Lightning-fast delivery, unbeatable prices, and a seamless shopping experience.
            </p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-primary btn-lg">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Shop Now
              </Link>
              <Link to="/shop?sort=newest" className="btn btn-outline btn-lg">
                Explore New Arrivals
              </Link>
            </div>
            <div className="hero-stats">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="hero-stat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="hero-scroll-hint">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Browse through our curated collection across all major categories</p>
            </div>
            <Link to="/shop" className="btn btn-outline btn-sm">View All →</Link>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link to={`/shop?category=${cat.name}`} className="category-card">
                  <div className="category-icon" style={{ '--cat-color': cat.color }}>{cat.icon}</div>
                  <span className="category-name">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED PRODUCTS ═══════════ */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Handpicked bestsellers and editor's favorites</p>
            </div>
            <Link to="/shop?sort=rating" className="btn btn-outline btn-sm">See All →</Link>
          </div>
          {loading ? (
            <div className="product-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="product-skeleton">
                  <div className="skeleton" style={{ aspectRatio: '1', marginBottom: '12px' }} />
                  <div className="skeleton" style={{ height: '14px', marginBottom: '8px', width: '60%' }} />
                  <div className="skeleton" style={{ height: '16px', marginBottom: '8px' }} />
                  <div className="skeleton" style={{ height: '12px', marginBottom: '8px', width: '40%' }} />
                  <div className="skeleton" style={{ height: '36px' }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="product-grid">
              {featured.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ PROMO BANNER ═══════════ */}
      <section className="section">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-content">
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>Limited Time Offer</span>
              <h2 className="promo-title">Get 20% Off Your First Order</h2>
              <p className="promo-sub">Use code <strong className="promo-code">NEXA20</strong> at checkout. Valid for new customers only.</p>
              <Link to="/shop" className="btn btn-primary btn-lg">Claim Discount</Link>
            </div>
            <div className="promo-decoration">
              <div className="promo-orb promo-orb-1" />
              <div className="promo-orb promo-orb-2" />
              <div className="promo-orb promo-orb-3" />
              <span className="promo-big-emoji">🎁</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TRENDING ═══════════ */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">🔥 Trending Now</h2>
              <p className="section-subtitle">What everyone is buying this week</p>
            </div>
            <Link to="/shop?sort=popular" className="btn btn-outline btn-sm">View All →</Link>
          </div>
          <div className="product-grid">
            {(trending.length ? trending : featured.slice(0,4)).map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="section">
        <div className="container">
          <div className="features-grid">
            {[
              { icon: '🚀', title: 'Express Delivery', desc: 'Same-day delivery available in 100+ cities' },
              { icon: '🛡️', title: 'Secure Payments', desc: '256-bit encryption on all transactions' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free return policy' },
              { icon: '🎁', title: 'Gift Wrapping', desc: 'Premium gift wrapping on every order' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="feature-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ NEWSLETTER ═══════════ */}
      <section className="section section-dark">
        <div className="container">
          <div className="newsletter-box">
            <div className="newsletter-glow" />
            <h2 className="section-title" style={{ textAlign: 'center' }}>Stay in the Loop</h2>
            <p className="section-subtitle" style={{ textAlign: 'center', margin: '12px auto 0' }}>
              Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email address..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ maxWidth: '400px', flex: 1 }}
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
