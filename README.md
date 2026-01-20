# 🍽️ Fullstack Restaurant Application

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, full-featured restaurant management and ordering platform built with Next.js, NestJS, and MongoDB**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This is a comprehensive full-stack restaurant application that provides a complete solution for online food ordering. The platform includes user authentication, menu management, shopping cart functionality, order processing, payment integration via Stripe, and a beautiful, responsive user interface with Dark Mode support.

### Key Highlights

✨ **Modern Tech Stack** - Built with the latest versions of Next.js 16, NestJS 11, and React 19  
🔐 **Secure Authentication** - JWT-based auth with email verification and password recovery  
💳 **Payment Integration** - Stripe Checkout with webhook support  
🌙 **Dark Mode** - Full Dark Mode support with smooth theme transitions  
📱 **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)  
⚡ **Performance Optimized** - Server-side rendering, caching, and optimized images  
🛒 **Smart Cart** - Guest cart with localStorage + authenticated cart sync  

---

## ✨ Features

### 🔐 Authentication & User Management

- **User Registration** - Secure signup with email validation
- **Login/Logout** - JWT-based authentication with httpOnly cookies
- **Password Recovery** - Forgot password flow with email OTP verification
- **Profile Management** - Update user profile information with avatar support
- **Role-Based Access** - User and Admin roles with guarded routes

### 🍕 Food & Menu Management

- **Dynamic Menu** - Searchable menu with filtering by type, price, and meal times
- **Featured Items** - Highlighted popular and featured dishes
- **Food Details** - Detailed view with images, ingredients, and pricing
- **Discount System** - Support for promotional pricing and discounts
- **Wishlist** - Save favorite items for quick access

### 🛒 Shopping Cart

- **Guest Cart** - Add items without registration (localStorage)
- **Authenticated Cart** - Persistent cart synchronized with database
- **Cart Sync** - Automatic merging of guest cart upon login
- **Quantity Management** - Update item quantities with real-time price calculation
- **Item Removal** - Remove items from cart with confirmation
- **Cart Count Badge** - Real-time cart item count in header

### 📦 Orders & Checkout

- **Order History** - Complete order history with detailed status tracking
- **Order Statistics** - User-specific statistics (total orders, completed, pending, total spent)
- **Stripe Integration** - Secure payment processing via Stripe Checkout
- **Webhook Support** - Automatic order status updates via Stripe webhooks
- **Order Tracking** - Track order status (pending, paid, cancelled)

### 🎨 User Interface

- **Modern Design** - Clean, professional UI with smooth animations
- **Dark Mode** - Full Dark Mode support with `next-themes`
- **Responsive Layout** - Mobile-first design that works on all screen sizes
- **Loading States** - Skeleton loaders and loading indicators
- **Error Handling** - Comprehensive error boundaries and user-friendly error messages
- **Toast Notifications** - Beautiful toast notifications for user feedback
- **Interactive Maps** - Leaflet map integration for location display

### ⚡ Performance & Optimization

- **Server-Side Rendering** - SSR with Next.js App Router
- **Static Generation** - Cached static pages for better performance
- **Image Optimization** - Next.js Image component with multiple CDN support
- **Code Splitting** - Dynamic imports for optimal bundle size
- **API Caching** - Strategic caching of static data

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.0.0-rc.1 | UI library |
| **TypeScript** | 5.7.3 | Type-safe JavaScript |
| **Tailwind CSS** | 4.0 | Utility-first CSS framework |
| **Shadcn/ui** | Latest | High-quality React components |
| **Framer Motion** | 12.23.26 | Animation library |
| **next-themes** | 0.4.6 | Dark mode support |
| **Sonner** | 2.0.7 | Toast notifications |
| **React Hook Form** | 7.70.0 | Form management |
| **Zod** | 4.2.1 | Schema validation |
| **Leaflet** | 1.9.4 | Interactive maps |
| **Lottie React** | 2.4.1 | Animation rendering |
| **Swiper** | 12.0.3 | Touch slider |
| **Lucide React** | 0.562.0 | Icon library |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | 11.0.1 | Node.js framework |
| **TypeScript** | 5.7.3 | Type-safe JavaScript |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | Latest | MongoDB ODM |
| **JWT** | 11.0.2 | Authentication tokens |
| **Bcrypt** | 6.0.0 | Password hashing |
| **Stripe** | 20.1.2 | Payment processing |
| **Nodemailer** | 7.0.12 | Email sending |
| **@nestjs-modules/mailer** | 2.0.2 | NestJS mail module |
| **Class Validator** | 0.14.3 | DTO validation |
| **Cookie Parser** | 1.4.7 | Cookie management |

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │   Services   │      │
│  │  (App Router)│  │   (UI/Forms) │  │  (API Calls) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Context    │  │  Server      │  │    Actions   │      │
│  │  (Cart State)│  │  Components  │  │  (Mutations) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            │ REST API
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      Backend (NestJS)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Controllers  │  │   Services   │  │   Guards     │      │
│  │  (Endpoints) │  │  (Business   │  │  (Auth/Roles)│      │
│  │              │  │   Logic)     │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     DTOs     │  │   Modules    │  │   Schemas    │      │
│  │ (Validation) │  │  (DI/Config) │  │  (Mongoose)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      MongoDB Database                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Users     │  │     Food     │  │    Orders    │      │
│  │    Carts     │  │  Wishlists   │  │   (History)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   External Services                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Stripe    │  │   Gmail      │  │   Webhooks   │      │
│  │  (Payments)  │  │  (Emails)    │  │   (Events)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Installation
### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/fullstack-restaurant.git
cd fullstack-restaurant
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment file
touch .env

# Configure environment variables (see Configuration section)
# Edit .env file with your values

# Start development server
npm run start:dev
```

The backend server will start on `http://localhost:3001` (default port).

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Create environment file
touch .env.local

# Configure environment variables
# Edit .env.local file with your values

# Start development server
npm run dev
```

The frontend application will start on `http://localhost:3000`.

---

## ⚙️ Configuration

### Backend Environment Variables (`.env`)

Create a `.env` file in the `Backend` directory:

### Frontend Environment Variables (`.env.local`)

Create a `.env.local` file in the `frontend` directory:

```env
# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## 📚 API Documentation

### Base URL

```
http://localhost:3001/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/signup` | Register a new user | ❌ |
| `POST` | `/auth/login` | User login | ❌ |
| `POST` | `/auth/logout` | User logout | ❌ |
| `PATCH` | `/auth/forgetpassword` | Request password reset | ❌ |
| `PATCH` | `/auth/resetpassword` | Reset password with OTP | ❌ |
| `GET` | `/auth/me` | Get current user | ✅ |
| `PATCH` | `/auth/update-profile` | Update user profile | ✅ |

### Food Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/food/home` | Get home page data (featured, popular, offers) | ❌ |
| `GET` | `/food/menu` | Get menu items with filters | ❌ (Optional) |
| `GET` | `/food/:id` | Get food item by ID | ❌ |
| `POST` | `/food` | Create food item (Admin) | ✅ |

### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/cart` | Add item to cart | ✅ |
| `GET` | `/cart` | Get user's cart | ✅ |
| `GET` | `/cart/count` | Get cart item count | ✅ |
| `PATCH` | `/cart/item/:foodId` | Update item quantity | ✅ |
| `DELETE` | `/cart/item/:foodId` | Remove item from cart | ✅ |

### Orders Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/orders` | Create checkout session | ✅ |
| `GET` | `/orders/my-orders` | Get user's order history | ✅ |
| `GET` | `/orders/statistics` | Get user's order statistics | ✅ |
| `POST` | `/webhooks/stripe` | Stripe webhook handler | ❌ (Webhook secret) |

### Request/Response Examples

**Signup Request:**
```json
POST /auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone_number": "+201234567890"
}
```

**Add to Cart Request:**
```json
POST /cart
{
  "foodId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

**Create Order Request:**
```json
POST /orders
{
  "cartId": "507f1f77bcf86cd799439011"
}
```

---

## 📁 Project Structure

```
fullstack-restaurant/
│
├── Backend/                          # NestJS Backend
│   ├── src/
│   │   ├── auth/                     # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   └── dto/                  # Data Transfer Objects
│   │   │
│   │   ├── users/                    # User management
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   └── schema/               # Mongoose schemas
│   │   │
│   │   ├── food/                     # Food/Menu management
│   │   │   ├── food.controller.ts
│   │   │   ├── food.service.ts
│   │   │   ├── interfaces/
│   │   │   └── schema/
│   │   │
│   │   ├── cart/                     # Shopping cart
│   │   │   ├── cart.controller.ts
│   │   │   ├── cart.service.ts
│   │   │   └── schema/
│   │   │
│   │   ├── orders/                   # Order management
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   └── schema/
│   │   │
│   │   ├── stripe/                   # Stripe integration
│   │   │   ├── stripe.service.ts
│   │   │   └── stripe.webhook.controller.ts
│   │   │
│   │   ├── wishlist/                 # Wishlist feature
│   │   ├── guard/                    # Auth guards & decorators
│   │   ├── database/                 # Database configuration
│   │   └── utils/                    # Utility functions
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                         # Next.js Frontend
│   ├── app/                          # App Router directory
│   │   ├── _components/              # Shared components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Table.tsx
│   │   │   └── ...
│   │   │
│   │   ├── features/                 # Feature-based components
│   │   │   └── home/
│   │   │       ├── FeaturedSection.tsx
│   │   │       ├── PopularDishes.tsx
│   │   │       └── ...
│   │   │
│   │   ├── auth/                     # Authentication pages
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── forgot-password/
│   │   │
│   │   ├── cart/                     # Cart page
│   │   ├── order/                    # Order history page
│   │   ├── profile/                  # Profile page
│   │   ├── menu/                     # Menu page
│   │   ├── contact/                  # Contact page
│   │   ├── about/                    # About page
│   │   │
│   │   ├── services/                 # API service functions
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── food/
│   │   │   └── orders/
│   │   │
│   │   ├── actions/                  # Server Actions
│   │   ├── context/                  # React Context providers
│   │   ├── types/                    # TypeScript types
│   │   ├── utils/                    # Utility functions
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   └── error.tsx                 # Error boundary
│   │
│   ├── components/                   # UI components (Shadcn)
│   │   ├── ui/
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   │
│   ├── public/                       # Static assets
│   ├── package.json
│   └── next.config.ts
│
└── README.md
```
---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abdelrahman Elsaeed**

- Email: abdoelsaeed290@gmail.com

---

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact: abdoelsaeed290@gmail.com

---

<div align="center">

**Made with ❤️ using Next.js and NestJS**

⭐ Star this repo if you found it helpful!

</div>
