# MILAN Clothing Brand - Backend API & Database

This backend provides REST APIs for the **MILAN** clothing brand web application, enabling dynamic updates to homepage sections (like the Hero image/text), product inventory management, order processing, and image uploads.

---

## 📁 Directory Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection with fallback handling
│   ├── controllers/
│   │   ├── contentController.js # Hero and section data controllers
│   │   ├── productController.js # Product CRUD & seeding
│   │   ├── uploadController.js  # Image file uploads
│   │   └── orderController.js   # Orders & Newsletter subscribers
│   ├── data/
│   │   └── initialData.js       # Default site content & product catalog
│   ├── middlewares/
│   │   ├── errorHandler.js      # Centralized error handler
│   │   └── uploadMiddleware.js  # Multer configuration for file uploads
│   ├── models/
│   │   ├── Product.js           # Mongoose Product Schema
│   │   ├── SiteContent.js       # Dynamic section content schema
│   │   ├── Order.js             # Order schema
│   │   └── Subscriber.js        # Newsletter subscriber schema
│   ├── routes/
│   │   ├── contentRoutes.js     # /api/content endpoints
│   │   ├── productRoutes.js     # /api/products endpoints
│   │   ├── uploadRoutes.js      # /api/upload endpoints
│   │   └── orderRoutes.js       # /api/orders & /api/newsletter
│   └── server.js                # Express app entry point
├── uploads/                     # Stored image uploads
├── .env.example
├── .env
├── package.json
└── README.md
```

---

## ⚡ Quick Start

```bash
cd backend
npm install
npm run dev
```

Server starts at: `http://localhost:5000`  
Health check: `http://localhost:5000/api/health`

---

## 🗄️ Database Configuration (MongoDB)

1. Open `backend/.env`.
2. Configure your `MONGO_URI`:
   - **Local MongoDB**: `mongodb://localhost:27017/milan_clothing_db`
   - **MongoDB Atlas (Cloud)**:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/milan_clothing_db?retryWrites=true&w=majority
     ```
3. Whenever MongoDB is connected, the server automatically saves and persists all changes permanently. If MongoDB is not yet running, the server gracefully operates with in-memory fallback.

---

## 🔌 API Endpoints Summary

### 1. Site Content & Hero Image
- **`GET /api/content`**: Retrieve all section data.
- **`GET /api/content/:sectionKey`**: Retrieve specific section (e.g. `hero`, `harfaBanner`, `winterCollections`, `videoBanner`).
- **`PUT /api/content/hero`**: Update hero section.
  ```json
  {
    "image": "/assets/milan-hero.jpg",
    "heading": "IN THE RIGHT OUTFIT\nANYTHING IS POSSIBLE",
    "subheading": "WINTER '25 EDITORIAL CAMPAIGN"
  }
  ```
- **`PUT /api/content/:sectionKey`**: Update any section content.
- **`POST /api/content/reset`**: Reset all content to default mockup values.

### 2. Product Management
- **`GET /api/products`**: Fetch all products (supports `?category=...&gender=...&search=...`).
- **`GET /api/products/:id`**: Fetch single product details.
- **`POST /api/products`**: Create a new product.
- **`PUT /api/products/:id`**: Update existing product details.
- **`DELETE /api/products/:id`**: Delete a product.
- **`POST /api/products/seed`**: Re-seed database with default Dribbble mockup products.

### 3. Image Uploads
- **`POST /api/upload`**: Upload image via `multipart/form-data` (field name: `image`).
  - Returns uploaded file URL to assign to hero or products.

### 4. Orders & Newsletter
- **`POST /api/orders`**: Create order on checkout.
- **`GET /api/orders`**: View all orders (Admin).
- **`POST /api/newsletter`**: Subscribe email address.
