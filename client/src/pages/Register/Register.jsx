import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function Register() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPass]   = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow]       = useState(false);
  const { register, loading } = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    const result = await register(name, email, password);
    if (result.success) navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
      </div>
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-logo">
          <span className="logo-icon">⬡</span>
          <span>Nexa<strong>Shop</strong></span>
        </div>
        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Join thousands of happy shoppers today</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input id="reg-name" type="text" className="form-input" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input id="reg-email" type="email" className="form-input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-password">
              <input id="reg-password" type={show ? 'text' : 'password'} className="form-input" placeholder="Min 6 characters" value={password} onChange={e => setPass(e.target.value)} required minLength={6} autoComplete="new-password" />
              <button type="button" className="show-pass-btn" onClick={() => setShow(v => !v)} tabIndex={-1}>{show ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input id="reg-confirm" type="password" className="form-input" placeholder="Repeat password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={6} autoComplete="new-password" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in →</Link>
        </p>
      </motion.div>
    </div>
  );
}
