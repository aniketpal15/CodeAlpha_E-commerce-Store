import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiArrowLeft, FiShield } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/api';
import toast from 'react-hot-toast';
import './ChangePassword.css';

export default function ChangePassword() {
  const { updateUserData } = useAuth();
  const navigate = useNavigate();

  const [passData, setPassData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passData.currentPassword) {
      toast.error('Please enter your current password');
      return;
    }
    if (!passData.newPassword) {
      toast.error('Please enter a new password');
      return;
    }
    if (passData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (passData.newPassword !== passData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { data } = await updateProfile({
        currentPassword: passData.currentPassword,
        newPassword: passData.newPassword,
      });
      updateUserData(data);
      toast.success('Password changed successfully! 🔒');
      setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page container" style={{ paddingTop: 'calc(var(--nav-h) + 40px)' }}>
      <motion.div
        className="change-password-card card glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="cp-header">
          <Link to="/profile" className="back-link">
            <FiArrowLeft /> Back to Profile
          </Link>
          <div className="cp-icon-title">
            <div className="cp-badge-icon">
              <FiShield />
            </div>
            <h2>Change Password</h2>
          </div>

          <p className="cp-subtitle">
            Enter your current password to verify your identity, then choose a new password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="cp-form">
          <div className="form-group">
            <label className="form-label">
              <FiLock /> Current (Old) Password *
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter current password"
              value={passData.currentPassword}
              onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FiLock /> New Password *
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter new password (min 6 chars)"
              value={passData.newPassword}
              onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FiLock /> Confirm New Password *
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Re-enter new password"
              value={passData.confirmPassword}
              onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
              required
            />
          </div>

          <div className="cp-actions">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              <FiLock /> {loading ? 'Verifying & Updating...' : 'Update Password'}
            </button>
            <Link to="/profile" className="btn btn-outline btn-lg">
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
