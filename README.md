# 🍕 Restaurant Management System - Full Stack

[![NestJS](https://img.shields.io/badge/NestJS-11.0-ea2845?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

<div align="center">
  <h3>🔥 Advanced Restaurant Management Platform with Real-time Features</h3>
  <p>A complete solution for restaurant operations, order management, and customer engagement</p>
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [📦 Tech Stack](#-tech-stack)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#-configuration)
- [📚 API Documentation](#-api-documentation)
- [🎯 Features in Detail](#-features-in-detail)
- [📱 Frontend Features](#-frontend-features)
- [🔐 Authentication & Security](#-authentication--security)
- [💳 Payment Integration](#-payment-integration)
- [📧 Email Service](#-email-service)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [📄 License](#-license)

---

## ✨ Features

### 🔑 Core Features

- ✅ **User Authentication & Authorization** - Secure JWT-based authentication with role management
- ✅ **Menu Management** - Complete food/product management system with categories and filters
- ✅ **Shopping Cart** - Full-featured cart with add, remove, and quantity management
- ✅ **Order Management** - Create, track, and manage customer orders
- ✅ **Wishlist System** - Save favorite items for later purchase
- ✅ **Payment Processing** - Integrated Stripe payment gateway with Web Hooks
- ✅ **Dashboard Analytics** - Real-time sales and order statistics
- ✅ **Email Notifications** - Automated email notifications for orders and updates
- ✅ **Admin Panel** - Complete admin dashboard for product and order management
- ✅ **Rate Limiting** - API rate limiting for security
- ✅ **CORS Support** - Cross-origin requests enabled
- ✅ **Data Validation** - Comprehensive input validation with class-validator

### 🎨 Advanced Features

- 🎯 **Real-time Updates** - Live order status and inventory updates
- 📊 **Advanced Analytics** - Charts and graphs for sales insights
- 🔍 **Search & Filter** - Powerful search with category filtering
- 🎪 **Featured Items** - Showcase featured products
- 💝 **Discount Management** - Dynamic discount system
- 🗺️ **Location Services** - Map integration for delivery tracking
- 🌓 **Dark Mode** - Full dark theme support
- 📱 **Responsive Design** - Fully responsive on all devices
- ⚡ **Performance Optimized** - Fast loading times and smooth interactions
- 🎬 **Animations** - Smooth UI animations and transitions

---

## 🏗️ Project Structure

```
restaurant-management/
├── 📁 Backend/
│   ├── 📁 src/
│   │   ├── 📁 auth/              # Authentication module
│   │   ├── 📁 users/             # User management
│   │   ├── 📁 food/              # Food/Menu management
│   │   ├── 📁 cart/              # Shopping cart
│   │   ├── 📁 orders/            # Order management
│   │   ├── 📁 wishlist/          # Wishlist system
│   │   ├── 📁 stripe/            # Payment integration
│   │   ├── 📁 dashboard/         # Dashboard & analytics
│   │   ├── 📁 guard/             # Authentication guards
│   │   ├── 📁 database/          # Database configuration
│   │   ├── 📁 utils/             # Utility functions
│   │   ├── app.module.ts         # Main app module
│   │   └── main.ts               # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
├── 📁 frontend/
│   ├── 📁 app/
│   │   ├── 📁 (dashboard)/       # Dashboard pages
│   │   ├── 📁 (site)/            # Public site pages
│   │   ├── 📁 api/               # API routes
│   │   ├── 📁 auth/              # Auth pages
│   │   ├── 📁 actions/           # Server actions
│   │   ├── 📁 components/        # UI components
│   │   ├── 📁 services/          # API services
│   │   ├── 📁 context/           # React context
│   │   ├── 📁 types/             # TypeScript types
│   │   └── 📁 utils/             # Utility functions
│   ├── 📁 public/                # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── tailwind.config.ts
│
└── 📄 README.md

```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/restaurant-management.git
cd restaurant-management
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create `.env` file in Backend folder:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/restaurant
MONGODB_USER=your_user
MONGODB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Server
PORT=3001
NODE_ENV=development
```

Start the backend:

```bash
npm run start:dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create `.env.local` file in frontend folder:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
```

Start the frontend:

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

---

## 📦 Tech Stack

### Backend

| Technology     | Purpose              | Version |
| -------------- | -------------------- | ------- |
| **NestJS**     | Backend Framework    | 11.0+   |
| **MongoDB**    | NoSQL Database       | Latest  |
| **Mongoose**   | MongoDB ODM          | Latest  |
| **JWT**        | Authentication       | 11.0+   |
| **Stripe**     | Payment Processing   | 20.1+   |
| **Nodemailer** | Email Service        | 7.0+    |
| **Throttler**  | Rate Limiting        | 6.5+    |
| **TypeScript** | Programming Language | 5.7+    |

### Frontend

| Technology          | Purpose           | Version |
| ------------------- | ----------------- | ------- |
| **Next.js**         | React Framework   | 16.1+   |
| **React**           | UI Library        | 19.0+   |
| **TypeScript**      | Type Safety       | 5.7+    |
| **Tailwind CSS**    | Styling           | 4.0+    |
| **React Hook Form** | Form Management   | 7.70+   |
| **Radix UI**        | UI Components     | 1.4+    |
| **Framer Motion**   | Animations        | 12.23+  |
| **Recharts**        | Charts & Graphs   | 2.15+   |
| **Leaflet**         | Map Integration   | 1.9+    |
| **Zod**             | Schema Validation | 4.2+    |

---

## 🔧 Installation

### Full Installation Guide

```bash
# 1. Clone repository
git clone https://github.com/yourusername/restaurant-management.git
cd restaurant-management

# 2. Install Backend dependencies
cd Backend
npm install

# 3. Setup Backend environment
# Create .env file with required variables (see .env.example)

# 4. Install Frontend dependencies
cd ../frontend
npm install

# 5. Setup Frontend environment
# Create .env.local file with required variables

# 6. Start both services
# Terminal 1 - Backend
cd Backend && npm run start:dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

---

## ⚙️ Configuration

### Backend Configuration

#### Database Connection

```env
MONGODB_URI=mongodb://localhost:27017/restaurant
```

#### JWT Configuration

```env
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=6000000s
```

#### Email Service (Gmail)

```env
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

#### Stripe Payment

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

#### API Server

```env
PORT=3001
NODE_ENV=development
```

### Frontend Configuration

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx
```

---

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/v1/auth/register       - Register new user
POST   /api/v1/auth/login          - Login user
POST   /api/v1/auth/refresh        - Refresh JWT token
POST   /api/v1/auth/logout         - Logout user
POST   /api/v1/auth/verify-email   - Verify email address
```

### Food/Menu Endpoints

```
GET    /api/v1/food                - Get all food items
GET    /api/v1/food/:id            - Get food by ID
POST   /api/v1/food                - Create new food (Admin)
PUT    /api/v1/food/:id            - Update food (Admin)
DELETE /api/v1/food/:id            - Delete food (Admin)
GET    /api/v1/food/search         - Search food items
```

### Cart Endpoints

```
GET    /api/v1/cart                - Get user cart
POST   /api/v1/cart                - Add to cart
PUT    /api/v1/cart/:id            - Update cart item
DELETE /api/v1/cart/:id            - Remove from cart
DELETE /api/v1/cart                - Clear cart
```

### Order Endpoints

```
GET    /api/v1/orders              - Get user orders
GET    /api/v1/orders/:id          - Get order details
POST   /api/v1/orders              - Create new order
PUT    /api/v1/orders/:id          - Update order status (Admin)
DELETE /api/v1/orders/:id          - Delete order (Admin)
```

### Wishlist Endpoints

```
GET    /api/v1/wishlist            - Get user wishlist
POST   /api/v1/wishlist            - Add to wishlist
DELETE /api/v1/wishlist/:id        - Remove from wishlist
```

### Payment Endpoints

```
POST   /api/v1/stripe/checkout     - Create payment session
POST   /api/v1/stripe/webhook      - Handle Stripe webhooks
GET    /api/v1/stripe/status       - Check payment status
```

### Dashboard Endpoints

```
GET    /api/v1/dashboard/stats     - Get dashboard statistics
GET    /api/v1/dashboard/sales     - Get sales analytics
GET    /api/v1/dashboard/revenue   - Get revenue data
```

---

## 🎯 Features in Detail

### 🔐 Authentication System

- JWT-based authentication with refresh tokens
- Email verification on registration
- Password encryption with bcrypt
- Session management
- Role-based access control (User, Admin)

### 🍽️ Food Management

- Add, edit, delete food items
- Categorize items (Burger, Pizza, Salad, Dessert, etc.)
- Manage ingredients and meal times
- Upload item images
- Price and discount management
- Featured items showcase

### 🛒 Shopping Cart

- Add items to cart with quantity
- Real-time price calculation
- Remove items from cart
- Cart persistence
- Quantity validation

### 📦 Order Management

- Create orders from cart
- Track order status
- Order history
- Order details with items and pricing
- Admin order management panel

### 💝 Wishlist System

- Save favorite items
- Quick add to cart from wishlist
- Remove from wishlist
- Persistent wishlist storage

### 💳 Stripe Integration

- Secure payment processing
- Webhook handling for payment updates
- Payment status tracking
- Order completion on successful payment

---

## 📱 Frontend Features

### Pages

- **Home Page** - Menu browsing with filters
- **Product Details** - Detailed product information
- **Shopping Cart** - Cart review and checkout
- **Checkout** - Payment processing with Stripe
- **Order History** - View past orders
- **Dashboard** - User profile and settings
- **Admin Dashboard** - Product and order management
- **Wishlist Page** - View saved items

### Components

- Navigation bar with search
- Product cards with images and ratings
- Filter sidebar
- Shopping cart widget
- User account menu
- Admin product management
- Order status tracker
- Analytics charts
- Map integration for delivery

### Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop optimization
- All screen sizes supported

---

## 🔐 Authentication & Security

### Security Features

- JWT token-based authentication
- HttpOnly cookies for token storage
- Password hashing with bcrypt
- Email verification
- CORS protection
- Rate limiting (20 requests per minute)
- Input validation and sanitization
- XSS protection
- CSRF tokens

### User Roles

```
ADMIN   - Full system access, product management
USER    - Browse menu, place orders, manage cart
GUEST   - Browse menu (limited access)
```

---

## 💳 Payment Integration

### Stripe Features

- Secure payment processing
- Multiple payment methods
- Webhook event handling
- Payment status tracking
- Invoice generation
- Refund support
- PCI compliance

### Payment Flow

```
1. User adds items to cart
2. Proceeds to checkout
3. Enters payment information
4. Stripe processes payment
5. Webhook confirms payment
6. Order is created and marked as paid
7. Confirmation email sent
```

---

## 📧 Email Service

### Email Features

- Account verification emails
- Order confirmation emails
- Order status updates
- Password reset emails
- Newsletter subscriptions
- Promotional emails

### Email Templates

- Welcome email
- Email verification
- Order confirmation
- Payment receipt
- Order shipped notification
- Order delivered notification

---

## 🧪 Testing

### Backend Testing

```bash
cd Backend

# Run unit tests
npm test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e
```

### Frontend Testing

```bash
cd frontend

# Run linting
npm run lint
```

---

## 🚢 Deployment

### Deploy Backend (Heroku/Railway/Render)

```bash
# Create Procfile
echo "web: npm run start:prod" > Procfile

# Deploy to Heroku
heroku create your-app-name
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Deploy Frontend (Vercel)

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# Or manually deploy with:
npm i -g vercel
vercel
```

### Environment Variables for Production

```
NODE_ENV=production
JWT_EXPIRES_IN=7d
MONGODB_URI=production_mongodb_uri
EMAIL_USERNAME=production_email
STRIPE_SECRET_KEY=live_stripe_key
```

---

## 📊 Project Statistics

- **Backend Routes**: 50+
- **API Endpoints**: 35+
- **Database Collections**: 8
- **Frontend Pages**: 12+
- **React Components**: 50+
- **UI Components**: 30+
- **Total Lines of Code**: 10,000+

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Git Workflow

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "Add your message"

# Push to branch
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

---

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start

```bash
# Check if MongoDB is running
# Check if port 3001 is available
# Verify .env file is properly configured
```

#### Frontend API calls failing

```bash
# Check NEXT_PUBLIC_API_BASE_URL in .env.local
# Verify backend is running on port 3001
# Check CORS configuration
```

#### Email not sending

```bash
# Enable "Less secure apps" or use App Password for Gmail
# Check EMAIL_USERNAME and EMAIL_PASSWORD in .env
```

#### Payment not processing

```bash
# Verify Stripe keys are correct
# Check webhook URL is accessible
# Ensure STRIPE_WEBHOOK_SECRET is set
```

---

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Stripe Documentation](https://stripe.com/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## 📞 Support

For support, email your email or open an issue on GitHub.

---

## 📄 License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- Next.js team for the React framework
- Stripe for payment processing
- MongoDB for the database
- All open-source contributors

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star!

**Made with ❤️ by [Your Name]**

[GitHub](https://github.com/yourusername) • [LinkedIn](https://linkedin.com/in/yourprofile) • [Twitter](https://twitter.com/yourhandle)

</div>
