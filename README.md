# 🛍️ NexaShop — Full-Stack E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://nexa-shop-23qjtsn8w-official-main.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646C99?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

A modern, responsive, full-stack e-commerce web application featuring dynamic product discovery, 3D interactive visuals, user authentication, cart management, checkout with multi-address support, order tracking, admin controls, and seamless dark/light theme switching.

🔗 **Live Deployment:** [https://nexa-shop-23qjtsn8w-official-main.vercel.app/](https://nexa-shop-rho.vercel.app/)

---

## ✨ Features

### 👤 Customer Experience
- **Authentication & Security:** JWT-based user authentication, password hashing with bcrypt, protected routes, and persistent session storage.
- **Product Discovery & Filtering:** Browse catalog, live search, category filtering, price sorting, and rating filters.
- **Interactive 3D Visuals:** Immersive hero elements and product showcases powered by Three.js and `@react-three/fiber`.
- **Product Details & Reviews:** High-resolution galleries, stock status indicators, customer ratings, and review submission.
- **Cart & Wishlist:** Real-time quantity adjustments, cart persistence in local storage, and wishlist management.
- **Checkout & Multi-Address Management:** Save, edit, and designate default shipping addresses with seamless order placement.
- **Order History:** Complete view of previous orders, item breakdowns, delivery tracking, and payment statuses.
- **Theme Customization:** Instant Dark / Light mode toggle with smooth CSS transitions and Lenis smooth scrolling.

### 🛡️ Admin Management
- **Product Catalog Control:** Add new products, edit details, update stock levels, and delete products.
- **Order Management:** View all incoming customer orders and update fulfillment status (Processing, Shipped, Delivered).
- **Protected Admin Routes:** Role-based access control preventing unauthorized access to administrative endpoints.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router v7, Framer Motion, Three.js, @react-three/fiber, Lenis, React Icons, React Hot Toast |
| **Backend** | Node.js, Express.js, Mongoose (MongoDB ODM), JSON Web Tokens (JWT), bcryptjs, Multer, CORS |
| **Database** | MongoDB Atlas |
| **Deployment** | Vercel (Frontend SPA + Serverless Express API via `/api`) |

---

## 📁 Project Structure

```text
E-commerce Store/
├── api/                  # Vercel serverless function entry point
│   └── index.js          # Express app wrapper for serverless API
├── client/               # Frontend React (Vite) application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   │   ├── context/      # Context providers (Auth, Cart, Theme)
│   │   ├── pages/        # Route pages (Home, Shop, ProductDetail, Cart, Checkout, Admin, etc.)
│   │   ├── services/     # Axios API service client
│   │   ├── index.css     # Global styles and design system variables
│   │   └── App.jsx       # Root router and component hierarchy
│   ├── package.json
│   └── vite.config.js
├── server/               # Backend Express REST API
│   ├── config/           # Database connection configuration (MongoDB)
│   ├── controllers/      # Route controllers (auth, products, orders, users)
│   ├── middleware/       # Auth guards, role checks, and error handlers
│   ├── models/           # Mongoose schemas (User, Product, Order)
│   ├── routes/           # REST endpoints
│   ├── seed/             # Database seeding scripts
│   ├── .env.example      # Environment variable template (safe)
│   └── server.js         # Local development Express server
├── vercel.json           # Vercel deployment routing configuration
└── package.json          # Root orchestration scripts
```

---

## ⚙️ Environment Configuration

For security, never commit real credentials or secrets to version control. Set up your `.env` file in the `server/` directory using the template below:

### `server/.env`

Create a file named `.env` in the `server` folder:

```env
# Server Port
PORT=5000

# MongoDB Connection String (Atlas or Local)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT Signing Secret (Generate a strong random string)
JWT_SECRET=your_jwt_secret_key_here

# Runtime Environment
NODE_ENV=development
```

> **Note:** For Vercel deployment, configure these exact environment variables (`MONGO_URI`, `JWT_SECRET`, `NODE_ENV`) in your **Vercel Project Settings → Environment Variables**.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB Atlas cluster URI or local MongoDB instance

### 2. Clone the Repository
```bash
git clone https://github.com/aniketpal15/CodeAlpha_E-commerce-Store.git
cd CodeAlpha_E-commerce-Store
```

### 3. Install Dependencies
Install dependencies across the workspace:
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

# Return to root
cd ..
```

### 4. Configure Environment Variables
Create `server/.env` using the template above and provide your database credentials and JWT secret.

### 5. (Optional) Seed Initial Product Data
```bash
cd server
node seed/seeder.js
cd ..
```

### 6. Run the Application
From the root directory, start both the frontend and backend concurrently:
```bash
npm run dev
```

- **Frontend Client:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

Alternatively, run them in separate terminals:
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run client
```

---

## 📡 API Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Authenticate user & retrieve token | Public |
| `GET` | `/api/auth/me` | Get current authenticated user profile | Private |
| `GET` | `/api/products` | Fetch paginated/filtered products | Public |
| `GET` | `/api/products/featured` | Fetch featured products | Public |
| `GET` | `/api/products/:id` | Fetch product details by ID | Public |
| `POST` | `/api/products/:id/reviews`| Submit product review & rating | Private |
| `POST` | `/api/products` | Create product | Admin |
| `PUT` | `/api/products/:id` | Update product | Admin |
| `DELETE`| `/api/products/:id` | Delete product | Admin |
| `POST` | `/api/orders` | Place a new order | Private |
| `GET` | `/api/orders/myorders` | Get user order history | Private |
| `GET` | `/api/orders` | Get all orders | Admin |
| `PUT` | `/api/orders/:id/status`| Update order status | Admin |
| `GET/POST`| `/api/users/addresses` | Fetch or add user shipping addresses | Private |

---

## 🌐 Deployment on Vercel

The repository is configured for direct Vercel deployment via [`vercel.json`](file:///c:/Users/anike/OneDrive/Documents/Coding/Internship%20assignment/E-commerce%20Store/vercel.json):
- Frontend SPA builds to `client/dist`.
- Backend endpoints route through `api/index.js` as serverless functions.
- Client requests to `/api/*` are handled by the serverless backend.

Live URL: **[https://nexa-shop-23qjtsn8w-official-main.vercel.app/](https://nexa-shop-23qjtsn8w-official-main.vercel.app/)**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
