const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc   Update user profile (with current password verification for password changes)
// @route  PUT /api/users/profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error('User not found'); }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  // Verify current password if attempting to change password
  if (req.body.newPassword) {
    if (!req.body.currentPassword) {
      res.status(400);
      throw new Error('Please enter your current password to change password');
    }
    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
      res.status(400);
      throw new Error('Current password is incorrect');
    }
    user.password = req.body.newPassword;
  }

  const updated = await user.save();
  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    isAdmin: updated.isAdmin,
  });
});


// @desc   Toggle wishlist product
// @route  POST /api/users/wishlist/:productId
const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const pid = req.params.productId;
  const idx = user.wishlist.indexOf(pid);
  if (idx === -1) {
    user.wishlist.push(pid);
  } else {
    user.wishlist.splice(idx, 1);
  }
  await user.save();
  res.json({ wishlist: user.wishlist });
});

// @desc   Get all users (admin)
// @route  GET /api/users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// @desc   Get user saved addresses
// @route  GET /api/users/addresses

const getAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error('User not found'); }
  res.json(user.addresses || []);
});

// @desc   Add new address
// @route  POST /api/users/addresses
const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error('User not found'); }

  const { label, street, city, postalCode, country, isDefault } = req.body;
  if (!street || !city || !postalCode || !country) {
    res.status(400);
    throw new Error('Please fill all required address fields');
  }

  const isFirst = user.addresses.length === 0;
  const shouldBeDefault = isDefault || isFirst;

  if (shouldBeDefault) {
    user.addresses.forEach(a => { a.isDefault = false; });
  }

  user.addresses.push({
    label: label || 'Home',
    street,
    city,
    postalCode,
    country,
    isDefault: shouldBeDefault,
  });

  await user.save();
  res.status(201).json(user.addresses);
});

// @desc   Delete address
// @route  DELETE /api/users/addresses/:addressId
const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error('User not found'); }

  const address = user.addresses.id(req.params.addressId);
  if (!address) { res.status(404); throw new Error('Address not found'); }

  const wasDefault = address.isDefault;
  address.deleteOne();

  if (wasDefault && user.addresses.length > 0) {
    user.addresses[0].isDefault = true;
  }

  await user.save();
  res.json(user.addresses);
});

// @desc   Set default address
// @route  PUT /api/users/addresses/:addressId/default
const setDefaultAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error('User not found'); }

  user.addresses.forEach(a => {
    a.isDefault = a._id.toString() === req.params.addressId;
  });

  await user.save();
  res.json(user.addresses);
});

// @desc   Update / Edit address
// @route  PUT /api/users/addresses/:addressId
const updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error('User not found'); }

  const address = user.addresses.id(req.params.addressId);
  if (!address) { res.status(404); throw new Error('Address not found'); }

  const { label, street, city, postalCode, country, isDefault } = req.body;
  if (label !== undefined) address.label = label;
  if (street !== undefined) address.street = street;
  if (city !== undefined) address.city = city;
  if (postalCode !== undefined) address.postalCode = postalCode;
  if (country !== undefined) address.country = country;

  if (isDefault) {
    user.addresses.forEach(a => { a.isDefault = false; });
    address.isDefault = true;
  }

  await user.save();
  res.json(user.addresses);
});

module.exports = {
  updateProfile,
  toggleWishlist,
  getAllUsers,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};


