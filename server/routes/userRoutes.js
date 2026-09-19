const express = require('express');
const router = express.Router();
const {
  updateProfile,
  toggleWishlist,
  getAllUsers,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require('../controllers/userController');

const { protect, admin } = require('../middleware/auth');

router.put('/profile', protect, updateProfile);
router.post('/wishlist/:productId', protect, toggleWishlist);
router.get('/', protect, admin, getAllUsers);

// Saved Addresses routes
router.route('/addresses')
  .get(protect, getAddresses)
  .post(protect, addAddress);

router.route('/addresses/:addressId')
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

router.put('/addresses/:addressId/default', protect, setDefaultAddress);

module.exports = router;


