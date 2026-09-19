import { Link } from 'react-router-dom';
import { FiShoppingBag, FiGithub, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-icon"><FiShoppingBag /></span>
            <span className="logo-text">NEXA<span className="logo-accent">STORE</span></span>
          </Link>
          <p className="footer-desc">
            Experience next-generation shopping with cutting-edge electronics, sleek design, and instant worldwide delivery.
          </p>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul>
            <li><Link to="/shop">Shop Collection</Link></li>
            <li><Link to="/shop?category=Audio">Audio Gear</Link></li>
            <li><Link to="/shop?category=Wearables">Wearables</Link></li>
            <li><Link to="/shop?category=Smartphones">Smartphones</Link></li>
            <li><Link to="/shop?category=Gaming">Gaming</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Account</h4>
          <ul>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/orders">Order History</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Contact Us</h4>
          <ul className="contact-list">
            <li><FiMapPin /> 100 Innovation Way, Tech Valley</li>
            <li><FiPhone /> +1 (800) 555-NEXA</li>
            <li><FiMail /> support@nexastore.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© {new Date().getFullYear()} NEXASTORE. All rights reserved. Crafted for excellence.</p>
          <div className="footer-badges">
            <span>⚡ Fast Shipping</span>
            <span>🔒 Secure Checkout</span>
            <span>💬 24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
