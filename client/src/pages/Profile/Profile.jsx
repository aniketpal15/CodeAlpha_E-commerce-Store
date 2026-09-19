import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiMapPin, FiSave, FiShoppingBag, FiShield, FiPlus, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { updateProfile, fetchAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../../services/api';
import toast from 'react-hot-toast';
import './Profile.css';

export default function Profile() {
  const { user, updateUserData } = useAuth();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // Address State
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Home',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false,
  });

  const loadAddresses = async () => {
    try {
      const { data } = await fetchAddresses();
      setAddresses(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
      loadAddresses();
    }
  }, [user]);


  useEffect(() => {
    if (location.search.includes('tab=addresses')) {
      setTimeout(() => {
        document.getElementById('saved-addresses')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [location]);

  // Update Name & Email
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const { data } = await updateProfile({
        name: formData.name,
        email: formData.email,
      });
      updateUserData(data);
      toast.success('Account details updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };



  // Edit Address State
  const [editingAddrId, setEditingAddrId] = useState(null);
  const [editAddrData, setEditAddrData] = useState({
    label: 'Home',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false,
  });

  const handleStartEdit = (addr) => {
    setEditingAddrId(addr._id);
    setEditAddrData({
      label: addr.label || 'Home',
      street: addr.street || '',
      city: addr.city || '',
      postalCode: addr.postalCode || '',
      country: addr.country || '',
      isDefault: !!addr.isDefault,
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editAddrData.street || !editAddrData.city || !editAddrData.postalCode || !editAddrData.country) {
      toast.error('Please fill all required address fields');
      return;
    }
    try {
      const { data } = await updateAddress(editingAddrId, editAddrData);
      setAddresses(data);
      setEditingAddrId(null);
      toast.success('Address updated successfully! ✨');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update address');
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.postalCode || !newAddr.country) {
      toast.error('Please fill all required address fields');
      return;
    }
    try {
      const { data } = await addAddress(newAddr);
      setAddresses(data);
      setShowAddModal(false);
      setNewAddr({ label: 'Home', street: '', city: '', postalCode: '', country: '', isDefault: false });
      toast.success('New address saved!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      const { data } = await deleteAddress(id);
      setAddresses(data);
      toast.success('Address deleted');
    } catch (err) {
      toast.error('Failed to delete address');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const { data } = await setDefaultAddress(id);
      setAddresses(data);
      toast.success('Default address updated!');
    } catch (err) {
      toast.error('Failed to set default address');
    }
  };

  return (
    <div className="profile-page container" style={{ paddingTop: 'calc(var(--nav-h) + 20px)' }}>
      <motion.div 
        className="profile-header glass"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="profile-header-info">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <span className="role-badge">
            <FiShield /> {user?.isAdmin ? 'Administrator' : 'Customer Member'}
          </span>
        </div>
      </motion.div>

      <div className="profile-grid">
        {/* Account Details & Password Security */}
        <motion.div 
          className="profile-form-card glass"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3>Personal Details</h3>
          <form onSubmit={handleUpdateProfile} className="profile-form" style={{ marginBottom: 'var(--space-2xl)' }}>
            <div className="form-group">
              <label><FiUser /> Full Name</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label><FiMail /> Email Address</label>
              <input 
                type="email" 
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-sm)' }} disabled={savingProfile}>
              <FiSave /> {savingProfile ? 'Saving...' : 'Update Info'}
            </button>
          </form>

          <div style={{ borderTop: '1px solid var(--clr-border)', marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-xl)' }}>
            <h3 style={{ marginBottom: 'var(--space-sm)' }}>Account Security</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-2)', marginBottom: 'var(--space-lg)' }}>
              Keep your account secure by updating your password regularly.
            </p>
            <Link to="/change-password" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-xs)' }}>
              <FiLock /> Change Account Password →
            </Link>
          </div>

        </motion.div>



        {/* Saved Addresses Section */}
        <motion.div 
          id="saved-addresses"
          className="profile-summary-card glass"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="address-section-header">
            <h3><FiMapPin /> Saved Addresses ({addresses.length})</h3>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setShowAddModal(!showAddModal)}
            >
              <FiPlus /> {showAddModal ? 'Cancel' : 'Add Address'}
            </button>
          </div>

          {/* Add Address Form */}
          {showAddModal && (
            <motion.form
              onSubmit={handleAddAddress}
              className="add-address-form card"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4>Add New Address</h4>
              <div className="form-group">
                <label>Label (e.g. Home, Work, Office)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Home"
                  value={newAddr.label}
                  onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="123 Main St, Apt 4B"
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="New York"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="10001"
                    value={newAddr.postalCode}
                    onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Country *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="United States"
                  value={newAddr.country}
                  onChange={(e) => setNewAddr({ ...newAddr, country: e.target.value })}
                  required
                />
              </div>
              <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={newAddr.isDefault}
                  onChange={(e) => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
                />
                <span>Set as default shipping address</span>
              </label>
              <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '8px' }}>
                Save Address
              </button>
            </motion.form>
          )}

          {/* List of saved addresses */}
          <div className="addresses-list">
            {loadingAddresses ? (
              <p>Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <p className="no-address-text">No saved addresses yet. Add one above to speed up checkout!</p>
            ) : (
              addresses.map((addr) => (
                <div key={addr._id} className={`profile-address-item card ${addr.isDefault ? 'is-default' : ''}`}>
                  {editingAddrId === addr._id ? (
                    /* EDIT ADDRESS INLINE FORM */
                    <form onSubmit={handleSaveEdit} className="add-address-form" style={{ margin: 0, padding: 0, border: 'none', background: 'transparent' }}>
                      <h4 style={{ color: 'var(--clr-primary)' }}>Edit Address</h4>
                      <div className="form-group">
                        <label>Label</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editAddrData.label}
                          onChange={(e) => setEditAddrData({ ...editAddrData, label: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Street Address *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editAddrData.street}
                          onChange={(e) => setEditAddrData({ ...editAddrData, street: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>City *</label>
                          <input
                            type="text"
                            className="form-input"
                            value={editAddrData.city}
                            onChange={(e) => setEditAddrData({ ...editAddrData, city: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Postal Code *</label>
                          <input
                            type="text"
                            className="form-input"
                            value={editAddrData.postalCode}
                            onChange={(e) => setEditAddrData({ ...editAddrData, postalCode: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Country *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editAddrData.country}
                          onChange={(e) => setEditAddrData({ ...editAddrData, country: e.target.value })}
                          required
                        />
                      </div>
                      <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                        <input
                          type="checkbox"
                          checked={editAddrData.isDefault}
                          onChange={(e) => setEditAddrData({ ...editAddrData, isDefault: e.target.checked })}
                        />
                        <span>Set as default shipping address</span>
                      </label>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingAddrId(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    /* VIEW ADDRESS CARD */
                    <>
                      <div className="address-item-top">
                        <span className="addr-tag">{addr.label || 'Home'}</span>
                        {addr.isDefault && (
                          <span className="default-tag"><FiCheckCircle /> Default</span>
                        )}
                      </div>
                      <p className="addr-text"><strong>{addr.street}</strong></p>
                      <p className="addr-subtext">{addr.city}, {addr.postalCode}, {addr.country}</p>

                      <div className="address-item-actions">
                        <button
                          type="button"
                          className="btn-link"
                          onClick={() => handleStartEdit(addr)}
                        >
                          ✏️ Edit
                        </button>
                        {!addr.isDefault && (
                          <button
                            type="button"
                            className="btn-link"
                            onClick={() => handleSetDefault(addr._id)}
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-link danger"
                          onClick={() => handleDeleteAddress(addr._id)}
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

