import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, FiShoppingBag, FiDollarSign, FiUsers, 
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiCheckCircle, 
  FiClock, FiTruck, FiX, FiRefreshCw 
} from 'react-icons/fi';
import { 
  fetchProducts, createProduct, updateProduct, deleteProduct, 
  getAllOrders, updateOrderStatus 
} from '../../services/api';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'Audio',
    image: '',
    description: '',
    countInStock: 10,
    isFeatured: false,
    badge: 'NEW',
    specs: { Connectivity: 'Bluetooth 5.3', Battery: '30h' }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, orderRes] = await Promise.all([
        fetchProducts({ limit: 100 }),
        getAllOrders()
      ]);
      setProducts(prodRes.data.products || []);
      setOrders(orderRes.data || []);
    } catch (err) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.isPaid ? o.totalPrice : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;

  // Product handlers
  const handleOpenModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setProductForm({
        name: prod.name,
        price: prod.price,
        originalPrice: prod.originalPrice || '',
        category: prod.category,
        image: prod.image,
        description: prod.description,
        countInStock: prod.countInStock,
        isFeatured: prod.isFeatured || false,
        badge: prod.badge || '',
        specs: prod.specs || {}
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        price: '',
        originalPrice: '',
        category: 'Audio',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        description: '',
        countInStock: 15,
        isFeatured: false,
        badge: 'NEW',
        specs: {}
      });
    }
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        countInStock: Number(productForm.countInStock),
      };

      if (editingProduct) {
        await updateProduct(editingProduct._id, payload);
        toast.success('Product updated!');
      } else {
        await createProduct(payload);
        toast.success('Product created!');
      }
      setShowProductModal(false);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted!');
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  // Order status update handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      toast.error('Failed to update order status');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o._id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.user?.name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.user?.email?.toLowerCase().includes(orderSearch.toLowerCase())
  );

  return (
    <div className="admin-page container">
      {/* Top Header */}
      <div className="admin-header">
        <div>
          <h1>Admin Command Center</h1>
          <p className="admin-subtitle">Manage catalog, customer orders, and store operations</p>
        </div>
        <button onClick={loadData} className="btn btn-secondary btn-sm">
          <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh Data
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="stats-grid">
        <motion.div className="stat-card glass" whileHover={{ y: -4 }}>
          <div className="stat-icon revenue"><FiDollarSign /></div>
          <div className="stat-details">
            <span className="stat-label">Total Paid Revenue</span>
            <h3 className="stat-value">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          </div>
        </motion.div>

        <motion.div className="stat-card glass" whileHover={{ y: -4 }}>
          <div className="stat-icon orders"><FiShoppingBag /></div>
          <div className="stat-details">
            <span className="stat-label">Total Orders</span>
            <h3 className="stat-value">{orders.length}</h3>
          </div>
        </motion.div>

        <motion.div className="stat-card glass" whileHover={{ y: -4 }}>
          <div className="stat-icon products"><FiPackage /></div>
          <div className="stat-details">
            <span className="stat-label">Active Products</span>
            <h3 className="stat-value">{products.length}</h3>
          </div>
        </motion.div>

        <motion.div className="stat-card glass" whileHover={{ y: -4 }}>
          <div className="stat-icon pending"><FiClock /></div>
          <div className="stat-details">
            <span className="stat-label">Pending Processing</span>
            <h3 className="stat-value">{pendingOrders}</h3>
          </div>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <FiPackage /> Products Catalog ({products.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <FiShoppingBag /> Orders Management ({orders.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
          <div className="tab-actions">
            <div className="search-bar glass">
              <FiSearch />
              <input 
                type="text"
                placeholder="Search products by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => handleOpenModal()} className="btn btn-primary">
              <FiPlus /> Add New Product
            </button>
          </div>

          <div className="table-wrapper glass">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-table">No products found</td>
                  </tr>
                ) : (
                  filteredProducts.map(p => (
                    <tr key={p._id}>
                      <td className="product-td">
                        <img src={p.image} alt={p.name} className="admin-thumb" />
                        <div>
                          <div className="admin-prod-title">{p.name}</div>
                          {p.badge && <span className="badge-chip">{p.badge}</span>}
                        </div>
                      </td>
                      <td><span className="cat-chip">{p.category}</span></td>
                      <td className="price-td">${p.price.toFixed(2)}</td>
                      <td>
                        <span className={`stock-badge ${p.countInStock < 5 ? 'low' : ''}`}>
                          {p.countInStock} in stock
                        </span>
                      </td>
                      <td>
                        {p.isFeatured ? (
                          <span className="featured-tag">Featured ⭐</span>
                        ) : (
                          <span className="text-subtle">Standard</span>
                        )}
                      </td>
                      <td className="actions-td">
                        <button onClick={() => handleOpenModal(p)} className="icon-btn edit" title="Edit Product">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => handleDeleteProduct(p._id)} className="icon-btn delete" title="Delete Product">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
          <div className="tab-actions">
            <div className="search-bar glass">
              <FiSearch />
              <input 
                type="text"
                placeholder="Search orders by ID or customer name/email..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-wrapper glass">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Fulfillment Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-table">No orders found</td>
                  </tr>
                ) : (
                  filteredOrders.map(o => (
                    <tr key={o._id}>
                      <td className="mono-id">#{o._id.slice(-6)}</td>
                      <td>
                        <div className="customer-name">{o.user?.name || 'Guest'}</div>
                        <div className="customer-email">{o.user?.email || 'N/A'}</div>
                      </td>
                      <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td>{o.items?.length || 0} items</td>
                      <td className="price-td">${o.totalPrice?.toFixed(2)}</td>
                      <td>
                        {o.isPaid ? (
                          <span className="badge-paid">Paid</span>
                        ) : (
                          <span className="badge-unpaid">Pending</span>
                        )}
                      </td>
                      <td>
                        <select 
                          className={`status-select ${o.status}`}
                          value={o.status}
                          onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* CREATE / EDIT PRODUCT MODAL */}
      <AnimatePresence>
        {showProductModal && (
          <div className="modal-backdrop">
            <motion.div 
              className="modal-card glass"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="modal-header">
                <h3>{editingProduct ? 'Edit Product' : 'Create New Product'}</h3>
                <button onClick={() => setShowProductModal(false)} className="close-btn"><FiX /></button>
              </div>

              <form onSubmit={handleSaveProduct} className="modal-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      className="form-input"
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    >
                      <option value="Audio">Audio</option>
                      <option value="Wearables">Wearables</option>
                      <option value="Smartphones">Smartphones</option>
                      <option value="Laptops">Laptops</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-input" 
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Original Price ($) (Optional)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-input" 
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={productForm.countInStock}
                      onChange={(e) => setProductForm({ ...productForm, countInStock: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    className="form-input"
                    rows="3"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="form-row checkbox-row">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={productForm.isFeatured}
                      onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    />
                    Featured on Home Page
                  </label>

                  <div className="form-group badge-group">
                    <label>Badge</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="HOT, NEW, SALE..."
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={() => setShowProductModal(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
