# 🛡️ Cleaning Supplies Store

### _A Premium MERN Stack Solution for Cleaning Supplies & Stock Management_

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Live Deployment

The application is professionally hosted and can be accessed at:
**[Live Demo: Cleaning Supplies Store](https://cleaning-supplies-store-0.vercel.app/)**

---

## 📖 Project Description

**Cleaning Supplies Store** is a sophisticated inventory management solution tailored specifically for the cleaning supplies industry. It is a dashboard-driven platform that empowers administrators and shop owners to manage product stock, pricing, and community discussions with ease. Built with **Next.js** and **TypeScript**, the system ensures a premium, high-performance, and type-safe user experience with a "button-smooth" interface.

---

## ✨ Key Features

- 🚀 **Dynamic Inventory Control**: View all products at once, add new supplies, and update stock status in real-time.
- 💎 **Glassmorphism UI**: A modern, luxury aesthetic featuring backdrop-blur effects and premium card designs for a professional feel.
- 💬 **Community Discussion**: Integrated discussion boards under every product with a full question-and-answer (Reply system) functionality.
- ⚡ **Flash Sale Management**: Dedicated sections to highlight exclusive discounts and limited-time promotional offers.
- 📱 **Fully Responsive**: Optimized for a flawless experience across all devices—from mobile phones to ultra-wide monitors.
- 🛠 **Full CRUD Operations**: Fully integrated backend operations for creating, reading, updating, and deleting inventory data.

## 🚀 Setup & Installation

Follow these organized steps to get the project running on your local machine.

| Step  | Component    | Action             | Details                                         |
| :---- | :----------- | :----------------- | :---------------------------------------------- |
| **1** | **Backend**  | `cd server`        | Navigate to the server directory                |
| **2** | **Backend**  | `npm install`      | Install all server-side dependencies            |
| **3** | **Backend**  | `.env` Setup       | Add `PORT=5000` and `MONGODB_URI`               |
| **4** | **Backend**  | `npm start`        | Start the Express server                        |
| **5** | **Frontend** | `cd client`        | Navigate to the client directory                |
| **6** | **Frontend** | `npm install`      | Install all React/Next.js dependencies          |
| **7** | **Frontend** | `.env.local` Setup | Add `NEXT_PUBLIC_API_URL=http://localhost:5000` |
| **8** | **Frontend** | `npm run dev`      | Launch the development server                   |

---

## 🛣️ Route & API Summary

### 🛠 Backend API Endpoints (Express.js)

| Method  | Endpoint                      | Purpose                                          |
| :------ | :---------------------------- | :----------------------------------------------- |
| `GET`   | `/items`                      | Fetch products with Search, Brand, & Pagination  |
| `POST`  | `/items`                      | Add a new product to the database                |
| `GET`   | `/api/v1/comments/:productId` | Retrieve all community discussions for a product |
| `POST`  | `/api/v1/comments`            | Post a new top-level community comment           |
| `PATCH` | `/api/v1/comments/reply/:id`  | Add a reply to an existing comment thread        |

### 🌐 Frontend Page Routes (Next.js)

| Route           | Page         | Description                                        |
| :-------------- | :----------- | :------------------------------------------------- |
| `/`             | **Home**     | Features Hero, Flash Sale, and Categories          |
| `/items`        | **Catalog**  | Full product listing with advanced sidebar filters |
| `/category`     | **Category** | Premium landing page for exploring collections     |
| `/items/[id]`   | **Details**  | Single product view + Community Discussion         |
| `/items/add`    | **Add**      | Add Product                                        |
| `/items/manage` | **Manage**   | Manage Product                                     |
| `/login`        | **Auth**     | User login and JWT authentication handling         |

---

## 🛠️ Key Technical Modifications

- **Optimized Variable Mapping:** Refactored frontend logic to use `items` and `id` for cleaner, standardized code.
- **Database Resilience:** Implemented a singleton-style connection pattern using `cachedDb` to prevent **500 Internal Server Errors** on Vercel deployments.
- **Defensive Programming:** Integrated safety patterns like optional chaining (`?.`) and empty array fallbacks (`|| []`) to maintain UI stability.
- **Hydration Fixes:** Utilized `isMounted` state logic to ensure consistent rendering in Next.js, preventing hydration mismatch errors.

---

## 💻 Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB (Native Driver)
- **Auth:** JWT with LocalStorage persistence & Firebase
- **Icons:** React Icons (Font Awesome, Material Design)

---

Developed with ❤️ by **S M Mazharul Islam Masum** for **Cleaning Supplies Store**.
