# 🍕 Food Ordering System — Frontend

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A modern, bilingual (English/Arabic) food ordering web application**

[Live Demo](https://food-ordering-system-next-js.vercel.app) · [Backend Repo](https://github.com/Ziad2024/Food-Ordering-System-Node.js)

</div>

---

## ✨ Features

### Customer Experience
| Feature | Details |
|---|---|
| 🌐 **Bilingual** | Full English & Arabic support with RTL layout (next-intl) |
| 🍽️ **Menu Browser** | Category filtering, pagination, product details with images |
| 🛒 **Smart Cart** | Slide-out cart drawer, quantity controls, live total, persisted in server |
| 📍 **Checkout** | 2-step flow: delivery address → payment method → instant order placement |
| 💳 **Stripe Payments** | Card payments redirect to hosted Stripe Checkout |
| 📦 **Order Tracking** | Live order status timeline with real-time Socket.IO updates |
| 👤 **My Orders** | Full order history accessible from the navbar |

### Admin Dashboard
| Feature | Details |
|---|---|
| 📊 **Analytics** | Revenue, order counts, active users, sales trend chart, top products |
| 🛍️ **Product Management** | Create/edit/delete products & categories with image upload |
| 📋 **Orders Management** | View all orders, filter by status/payment, update order status |
| 👥 **User Management** | Toggle user roles (customer ↔ admin) and active status |
| ⚡ **Real-time** | New orders and status updates appear without page refresh |

---

## 🏗️ Project Structure

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx                    # Root locale layout (Navbar, Providers)
│       ├── page.tsx                      # Landing / Hero page
│       ├── products/                     # Menu with category filters + pagination
│       ├── products/[id]/                # Product detail page
│       ├── cart/                         # Full cart view
│       ├── checkout/                     # 2-step checkout (address → payment)
│       │   ├── success/                  # Stripe success redirect handler
│       │   └── cancel/                   # Stripe cancel redirect handler
│       ├── orders/                       # My Orders list
│       │   └── [id]/                     # Order detail & live tracking
│       ├── (auth)/
│       │   ├── login/                    # Login page
│       │   └── register/                 # Registration page
│       └── (admin)/
│           └── admin/
│               ├── dashboard/            # KPI cards + charts
│               ├── orders/               # Order management table
│               ├── products/             # Product & category CRUD
│               ├── management/           # User management
│               └── analytics/           # Extended analytics
├── components/
│   └── layouts/
│       ├── Navbar.tsx                    # Responsive bilingual navbar
│       └── AdminSidebar.tsx              # Admin side navigation
├── features/                             # Domain-driven feature modules
│   ├── auth/                             # Login/register forms, LoginForm
│   ├── cart/                             # Cart store (Zustand), useCart, CartDrawer
│   ├── checkout/                         # useCheckout, AddressForm, PaymentSelector
│   ├── orders/                           # useOrders, useOrderTracking, OrderCard
│   ├── products/                         # useProducts, ProductCard, ProductDetailView
│   └── admin/                            # useAdminOrders, useAdminUsers, all admin components
├── providers/
│   ├── SocketProvider.tsx                # Socket.IO connection + room joining
│   └── QueryProvider.tsx                 # TanStack Query provider
├── services/                             # Axios API clients
│   ├── axiosClient.ts                    # Base axios instance with auth interceptors
│   ├── auth.service.ts
│   ├── order.service.ts
│   ├── product.service.ts
│   └── admin.service.ts
├── store/
│   └── auth.store.ts                     # Zustand global auth state
├── types/
│   └── api.types.ts                      # Shared TypeScript interfaces
└── i18n/
    ├── routing.ts                        # next-intl locale routing
    └── messages/
        ├── en.json                       # English translations
        └── ar.json                       # Arabic translations
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Running backend API (see [backend repo](https://github.com/Ziad2024/Food-Ordering-System-Node.js))

### 1. Clone & Install

```bash
git clone https://github.com/Ziad2024/Food-ordering-system-Next.js-.git
cd Food-ordering-system-Next.js-
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

> For production, point these to your deployed backend URL.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app auto-selects your browser language (`en` or `ar`).

---

## 🌐 Internationalization

The app uses **next-intl** for full bilingual support:

- Routes are prefixed with locale: `/en/products`, `/ar/products`
- The navbar, checkout, orders, and admin UI are all translated
- Arabic mode activates RTL layout automatically via `dir="rtl"`

To add a new translation key:
1. Add to `src/i18n/messages/en.json`
2. Add the Arabic equivalent to `src/i18n/messages/ar.json`
3. Use `useTranslations('namespace')` in your component

---

## ⚡ Real-time Order Updates

The `SocketProvider` connects to the backend Socket.IO server and joins the appropriate rooms on login:

```ts
// User room for personal order updates
socket.emit('join_user_room', user.id);

// Admin room for all new order notifications
if (user.role === 'admin') {
  socket.emit('join_admin_room');
}
```

**Hooks that listen for live events:**

| Hook | Event | Effect |
|------|-------|--------|
| `useOrderTracking` | `order_status_updated` | Updates status, paymentStatus, and timeline in-place |
| `useOrders` | `order_status_updated` | Invalidates the My Orders query |
| `useAdminOrders` | `order_created`, `order_status_updated` | Refreshes admin orders table, shows toast |

---

## 💅 UI & Design System

- **Tailwind CSS** — utility-first styling
- **Framer Motion** — page transitions and animated UI elements
- **Lucide React** — consistent iconography
- **Sonner** — toast notifications
- Dark admin panel with glassmorphism cards
- Light customer-facing menu with warm orange brand color

---

## 🛒 Checkout Flow

```
Cart → Address Form → Payment Method → Place Order
                                           ↓
                               Cash: → Order Tracking page
                               Card: → Stripe Checkout → Success page → Order Tracking
```

The checkout is a 2-step flow managed by the `useCheckout` hook:
1. **Address step** — validated with Zod (street, building, floor, apartment)
2. **Payment step** — choose Cash on Delivery or Card; clicking "Place Order" submits immediately

---

## 📦 State Management

| Concern | Tool |
|---|---|
| Server data (products, orders) | **TanStack Query** — with caching, background refetching |
| Auth session | **Zustand** — persisted in `localStorage` |
| Cart UI (drawer open/close) | **Zustand** — `useCartStore` |
| Real-time data | **Socket.IO** via `SocketProvider` context |

---

## 🚢 Deployment

Deployed on **Vercel** with automatic deploys on push to `main`.

**Environment variables** are set in the Vercel dashboard under Project Settings → Environment Variables.

**Live URL:** `https://food-ordering-system-next-js.vercel.app`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework with App Router |
| TypeScript | Type safety across the entire codebase |
| Tailwind CSS | Utility-first styling |
| TanStack Query | Server state management & caching |
| Zustand | Client state (auth, cart) |
| Socket.IO Client | Real-time order updates |
| Axios | HTTP client with interceptors |
| next-intl | Internationalization (EN/AR) |
| Framer Motion | Animations & transitions |
| Zod | Form & schema validation |
| Sonner | Toast notification system |
| Lucide React | Icon library |
