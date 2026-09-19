import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/',      label: 'Home' },
  { to: '/shop',  label: 'Shop' },
];

const CATEGORIES = ['Electronics','Fashion','Home','Sports','Beauty','Books','Gaming','Accessories'];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropOpen, setDropOpen]   = useState(false);
  const { user, logout }          = useAuth();
  const { itemCount, toggleCart } = useCart();
  const { isDark, toggleTheme }   = useTheme();
  const navigate                  = useNavigate();
  const searchRef                 = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">⬡</span>
            <span>Nexa<strong>Shop</strong></span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar-links">
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end={l.to==='/'}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="dropdown-wrapper" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
              <span className="nav-link">Categories ▾</span>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    className="dropdown"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {CATEGORIES.map(c => (
                      <Link key={c} to={`/shop?category=${c}`} className="dropdown-item" onClick={() => setDropOpen(false)}>
                        {c}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            {/* Search */}
            <button className="icon-btn" onClick={() => setSearchOpen(v => !v)} aria-label="Search">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>

            {/* Theme Toggle */}
            <button
              className="icon-btn theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Cart */}
            <button className="icon-btn cart-btn" onClick={toggleCart} aria-label="Cart">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </button>

            {/* Auth - Clickable Avatar Menu */}
            {user ? (
              <div className="user-menu-wrapper" ref={userMenuRef}>
                <button
                  type="button"
                  className="user-avatar-btn"
                  onClick={() => setUserMenuOpen(v => !v)}
                  aria-label="User Menu"
                >
                  <span className="avatar-initial">{user.name[0].toUpperCase()}</span>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="user-dropdown-menu"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="user-info">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                      <div className="divider" />
                      {user.role === 'admin' && (
                        <Link to="/admin" className="dropdown-item" style={{ color: 'var(--clr-primary)', fontWeight: 'bold' }} onClick={() => setUserMenuOpen(false)}>
                          ⚡ Admin Dashboard
                        </Link>
                      )}
                      <Link to="/profile" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        👤 Profile
                      </Link>
                      <Link to="/orders" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        📦 My Orders
                      </Link>
                      <Link to="/profile?tab=addresses" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        📍 Saved Addresses
                      </Link>
                      <div className="divider" />
                      <button className="dropdown-item danger" onClick={() => { logout(); setUserMenuOpen(false); }}>
                        🚪 Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
            )}


            {/* Mobile hamburger */}
            <button className="hamburger icon-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="search-bar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={handleSearch} className="container search-form">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="btn btn-primary btn-sm">Search</button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSearchOpen(false)}>✕</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <div className="overlay" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="mobile-menu-header">
                <span className="navbar-logo">
                  <span className="logo-icon">⬡</span>
                  <span>Nexa<strong>Shop</strong></span>
                </span>
                <button className="icon-btn" onClick={() => setMenuOpen(false)}>✕</button>
              </div>
              <nav className="mobile-nav">
                <button className="mobile-nav-link" onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span>Theme</span>
                  <span>{isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
                </button>
                {NAV_LINKS.map(l => (
                  <NavLink key={l.to} to={l.to} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </NavLink>
                ))}
                <div className="mobile-categories">
                  <span className="mobile-cat-label">Categories</span>
                  {CATEGORIES.map(c => (
                    <Link key={c} to={`/shop?category=${c}`} className="mobile-nav-link sub" onClick={() => setMenuOpen(false)}>
                      {c}
                    </Link>
                  ))}
                </div>
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="mobile-nav-link" style={{ color: 'var(--clr-primary)', fontWeight: 'bold' }} onClick={() => setMenuOpen(false)}>
                        ⚡ Admin Dashboard
                      </Link>
                    )}
                    <Link to="/profile" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Profile</Link>
                    <Link to="/orders" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>My Orders</Link>
                    <button className="mobile-nav-link danger" onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
                    <Link to="/register" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Create Account</Link>
                  </>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
