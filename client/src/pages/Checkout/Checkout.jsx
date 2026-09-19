import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder, fetchAddresses, addAddress as apiAddAddress } from '../../services/api';
import toast from 'react-hot-toast';
import './Checkout.css';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [saveToProfile, setSaveToProfile] = useState(true);

  const [form, setForm] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    label: 'Home',
    paymentMethod: 'Card',
  });

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Fetch saved addresses on mount
  useEffect(() => {
    if (user) {
      fetchAddresses()
        .then(({ data }) => {
          setAddresses(data || []);
          if (data && data.length > 0) {
            const defaultAddr = data.find(a => a.isDefault) || data[0];
            setSelectedAddressId(defaultAddr._id);
            setForm(f => ({
              ...f,
              address: defaultAddr.street,
              city: defaultAddr.city,
              postalCode: defaultAddr.postalCode,
              country: defaultAddr.country,
              label: defaultAddr.label || 'Home',
            }));
          } else {
            setShowNewAddressForm(true);
          }
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr._id);
    setShowNewAddressForm(false);
    setForm(f => ({
      ...f,
      address: addr.street,
      city: addr.city,
      postalCode: addr.postalCode,
      country: addr.country,
      label: addr.label || 'Home',
    }));
  };

  const handleNextStep = async () => {
    if (!form.fullName || !form.address || !form.city || !form.postalCode || !form.country) {
      toast.error('Please fill all required address fields');
      return;
    }

    // If typing a new address and saveToProfile is checked, persist it to user DB
    if (showNewAddressForm && saveToProfile && user) {
      try {
        await apiAddAddress({
          label: form.label || 'Home',
          street: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
          isDefault: addresses.length === 0,
        });
      } catch (err) {
        console.error('Failed to save address to profile:', err);
      }
    }

    setStep(1);
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: items.map(i => ({
          product: i._id, name: i.name,
          image: i.images?.[0] || '', price: i.price, qty: i.qty,
        })),
        shippingAddress: {
          fullName: form.fullName, address: form.address,
          city: form.city, postalCode: form.postalCode,
          country: form.country, phone: form.phone,
        },
        paymentMethod: form.paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
      };
      const { data } = await createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ paddingTop: 'calc(var(--nav-h) + 60px)' }}>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products before checking out</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container checkout-layout">
        {/* ── Left: Steps ── */}
        <div className="checkout-main">
          {/* Progress */}
          <div className="checkout-progress">
            {STEPS.map((s, i) => (
              <div key={s} className={`progress-step${i <= step ? ' active' : ''}${i < step ? ' done' : ''}`}>
                <div className="progress-num">{i < step ? '✓' : i + 1}</div>
                <span>{s}</span>
                {i < STEPS.length - 1 && <div className="progress-line" />}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="step-content card"
          >
            {step === 0 && (
              <div className="step-form">
                <h2 className="step-title">Select Shipping Address</h2>
                
                {/* Saved Addresses List */}
                {addresses.length > 0 && (
                  <div className="saved-addresses-grid">
                    {addresses.map(addr => (
                      <div
                        key={addr._id}
                        className={`saved-address-card${selectedAddressId === addr._id && !showNewAddressForm ? ' selected' : ''}`}
                        onClick={() => handleSelectAddress(addr)}
                      >
                        <div className="address-card-header">
                          <span className="address-label-badge">{addr.label || 'Home'}</span>
                          {addr.isDefault && <span className="default-badge">Default</span>}
                        </div>
                        <p className="address-street">{addr.street}</p>
                        <p className="address-city">{addr.city}, {addr.postalCode}</p>
                        <p className="address-country">{addr.country}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new address toggle button */}
                {addresses.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-outline btn-sm toggle-new-address-btn"
                    onClick={() => {
                      setShowNewAddressForm(!showNewAddressForm);
                      if (!showNewAddressForm) {
                        setSelectedAddressId(null);
                        setForm(f => ({ ...f, address: '', city: '', postalCode: '', country: '' }));
                      }
                    }}
                  >
                    {showNewAddressForm ? '← Use Saved Address' : '+ Add New Shipping Address'}
                  </button>
                )}

                {/* Form Inputs (shown when entering new address or if no saved addresses exist) */}
                {(showNewAddressForm || addresses.length === 0) && (
                  <motion.div
                    className="form-grid"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <div className="form-group">
                      <label className="form-label">Address Label (e.g. Home, Work)</label>
                      <input className="form-input" placeholder="Home" value={form.label} onChange={e => setField('label', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input id="ship-name" className="form-input" placeholder="John Doe" value={form.fullName} onChange={e => setField('fullName', e.target.value)} required />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}>
                      <label className="form-label">Street Address *</label>
                      <input id="ship-address" className="form-input" placeholder="123 Main Street, Apt 4B" value={form.address} onChange={e => setField('address', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input id="ship-city" className="form-input" placeholder="New York" value={form.city} onChange={e => setField('city', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Postal Code *</label>
                      <input id="ship-postal" className="form-input" placeholder="10001" value={form.postalCode} onChange={e => setField('postalCode', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country *</label>
                      <input id="ship-country" className="form-input" placeholder="United States" value={form.country} onChange={e => setField('country', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input id="ship-phone" className="form-input" placeholder="+1 234 567 8900" value={form.phone} onChange={e => setField('phone', e.target.value)} />
                    </div>
                    {user && (
                      <div className="form-group" style={{ gridColumn: '1/-1' }}>
                        <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                          <input type="checkbox" checked={saveToProfile} onChange={e => setSaveToProfile(e.target.checked)} />
                          <span>Save this address to my profile for future orders</span>
                        </label>
                      </div>
                    )}
                  </motion.div>
                )}

                {!showNewAddressForm && addresses.length > 0 && (
                  <div className="form-group" style={{ marginTop: '8px' }}>
                    <label className="form-label">Recipient Phone Number</label>
                    <input id="ship-phone" className="form-input" placeholder="+1 234 567 8900" value={form.phone} onChange={e => setField('phone', e.target.value)} />
                  </div>
                )}

                <button
                  className="btn btn-primary"
                  onClick={handleNextStep}
                >
                  Continue to Payment →
                </button>
              </div>
            )}


            {step === 1 && (
              <div className="step-form">
                <h2 className="step-title">Payment Method</h2>
                <div className="payment-options">
                  {['Card', 'PayPal', 'Cash on Delivery'].map(m => (
                    <label key={m} className={`payment-option${form.paymentMethod === m ? ' selected' : ''}`}>
                      <input type="radio" name="payment" value={m} checked={form.paymentMethod === m} onChange={() => setField('paymentMethod', m)} />
                      <div className="payment-icon">
                        {m === 'Card' ? '💳' : m === 'PayPal' ? '🅿️' : '💵'}
                      </div>
                      <span>{m}</span>
                    </label>
                  ))}
                </div>
                {form.paymentMethod === 'Card' && (
                  <div className="mock-card">
                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input className="form-input" placeholder="4242 4242 4242 4242" maxLength={19} />
                    </div>
                    <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                      <div className="form-group">
                        <label className="form-label">Expiry</label>
                        <input className="form-input" placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV</label>
                        <input className="form-input" placeholder="123" maxLength={4} type="password" />
                      </div>
                    </div>
                    <p className="mock-notice">🔒 This is a demo — no real charge will be made</p>
                  </div>
                )}
                <div className="step-actions">
                  <button className="btn btn-outline" onClick={() => setStep(0)}>← Back</button>
                  <button className="btn btn-primary" onClick={() => setStep(2)}>Review Order →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-form">
                <h2 className="step-title">Review Your Order</h2>
                <div className="review-items">
                  {items.map(item => (
                    <div key={item._id} className="review-item-row">
                      <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80'} alt={item.name} className="review-item-img" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80'; }} />
                      <div className="review-item-info">
                        <span>{item.name}</span>
                        <span className="text-muted">× {item.qty}</span>
                      </div>
                      <span className="review-item-price">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="review-address">
                  <h4>📍 Shipping to</h4>
                  <p>{form.fullName}, {form.address}, {form.city}, {form.postalCode}, {form.country}</p>
                </div>
                <div className="review-payment">
                  <h4>💳 Payment via {form.paymentMethod}</h4>
                </div>
                <div className="step-actions">
                  <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={placeOrder} disabled={loading}>
                    {loading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Right: Order Summary ── */}
        <div className="checkout-summary">
          <div className="summary-card card">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-items">
              {items.map(item => (
                <div key={item._id} className="summary-item">
                  <span className="summary-item-name">{item.name} <span className="text-muted">×{item.qty}</span></span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div className="summary-totals">
              <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="summary-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="summary-row total">
                <span>Total</span>
                <span className="price-current">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
