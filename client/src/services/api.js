import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('nexaUser') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser   = (data) => api.post('/auth/register', data);
export const loginUser      = (data) => api.post('/auth/login', data);
export const getMe          = ()     => api.get('/auth/me');

// Products
export const fetchProducts  = (params) => api.get('/products', { params });
export const fetchFeatured  = ()       => api.get('/products/featured');
export const fetchProduct   = (id)     => api.get(`/products/${id}`);
export const addReview      = (id, data) => api.post(`/products/${id}/reviews`, data);

// Orders
export const createOrder    = (data) => api.post('/orders', data);
export const getMyOrders    = ()     => api.get('/orders/myorders');
export const getOrder       = (id)   => api.get(`/orders/${id}`);
export const payOrder       = (id)   => api.put(`/orders/${id}/pay`);

// Users
export const updateProfile  = (data) => api.put('/users/profile', data);
export const toggleWishlist = (pid)  => api.post(`/users/wishlist/${pid}`);

// Addresses
export const fetchAddresses     = ()           => api.get('/users/addresses');
export const addAddress         = (data)       => api.post('/users/addresses', data);
export const updateAddress      = (id, data)   => api.put(`/users/addresses/${id}`, data);
export const deleteAddress      = (id)         => api.delete(`/users/addresses/${id}`);
export const setDefaultAddress  = (id)         => api.put(`/users/addresses/${id}/default`);



// Admin
export const createProduct  = (data)       => api.post('/products', data);
export const updateProduct  = (id, data)   => api.put(`/products/${id}`, data);
export const deleteProduct  = (id)         => api.delete(`/products/${id}`);
export const getAllOrders   = ()           => api.get('/orders');
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });

export default api;
