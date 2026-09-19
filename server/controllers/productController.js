const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc   Get all products with filtering, sorting, pagination
// @route  GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 20;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.search
    ? { name: { $regex: req.query.search, $options: 'i' } }
    : {};
  const categoryFilter = req.query.category ? { category: req.query.category } : {};
  const priceFilter =
    req.query.minPrice || req.query.maxPrice
      ? {
          price: {
            ...(req.query.minPrice && { $gte: Number(req.query.minPrice) }),
            ...(req.query.maxPrice && { $lte: Number(req.query.maxPrice) }),
          },
        }
      : {};

  const sortMap = {
    newest: { createdAt: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating: { rating: -1 },
    popular: { numReviews: -1 },
  };
  const sort = sortMap[req.query.sort] || { createdAt: -1 };

  const filter = { ...keyword, ...categoryFilter, ...priceFilter };
  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc   Get single product
// @route  GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name avatar');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// @desc   Get featured products
// @route  GET /api/products/featured
const getFeatured = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(20);
  res.json(products);
});

// @desc   Create product (admin)
// @route  POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc   Update product (admin)
// @route  PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) { res.status(404); throw new Error('Product not found'); }
  res.json(product);
});

// @desc   Delete product (admin)
// @route  DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  res.json({ message: 'Product deleted' });
});

// @desc   Add product review
// @route  POST /api/products/:id/reviews
const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }

  const already = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if (already) { res.status(400); throw new Error('Already reviewed'); }

  product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
  product.calcRating();
  await product.save();
  res.status(201).json({ message: 'Review added' });
});

module.exports = { getProducts, getProductById, getFeatured, createProduct, updateProduct, deleteProduct, addReview };
