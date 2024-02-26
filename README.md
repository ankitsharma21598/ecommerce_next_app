
# E-commerce Next.js Application 

## Description

This API is designed to manage an E-commerce platform. Users can interact with various endpoints to perform actions such as viewing their cart, adding items to it, removing items, purchasing products, viewing purchased products, and retrieving specific product details.

### Live Next.js App: https://ecommerce-next-app-navy.vercel.app/

### Live API Link: https://ecommerce-api-three-eta.vercel.app/

### API Documentation Link: https://documenter.getpostman.com/view/28236734/2sA2rDwLXj

### API Github Link: https://github.com/ankitsharma21598/ecommerce_api

### Video Explanation Link: 

## Features

- View shopping cart contents
- Add items to the cart
- Remove items from the cart
- Update item quantities
- Proceed to checkout

## Technologies Used

- **Frontend**: React.js, Next.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS
- **Other**: Cookies (for managing user sessions)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ankitsharma21598/ecommerce_next_app.git
```

2. Install dependencies:

```bash
cd ecommerce_next_app
npm install
```

3. Start the frontend and backend servers:

```bash
npm run dev
```

4. Access the application in your browser at `http://localhost:3000`.

## Endpoints for API

### 1. Cart Management

- **GET /api/cart**: Retrieve the current user's cart contents.
- **POST /api/cart/add/:productId**: Add a product to the cart.
- **DELETE /api/cart/remove/:cartId**: Remove a product from the cart.
- **PUT /api/cart/update**: Update the quantity of a product in the cart.

### 2. Product Management

- **GET /api/products?categoryId**: Retrieve a list of all available products by categoryId.
- **GET /api/products/:productId**: Retrieve details of a specific product.
- **GET /api/products/:productId**: Retrieve details of a specific product.

### 3. Purchase Management

- **POST /api/purchase**: Purchase the items in the cart.
- **GET /api/purchases**: Retrieve a list of purchased products.

## Usage

1. Sign up for an account or log in if you already have one.
2. Browse products and add them to your shopping cart.
3. View your cart, update quantities, or remove items as needed.
4. Proceed to checkout to complete your purchase.
