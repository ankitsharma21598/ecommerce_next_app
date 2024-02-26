import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Initialize with null
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/categories`
        );
        setCategories(response.data);
        setLoadingCategories(false);
        // Select the first category by default
        if (response.data.length > 0) {
          handleCategoryClick(response.data[0].category_id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    setLoadingProducts(true);
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/products?categoryId=${categoryId}`
      );
      console.log(`Products for category ${categoryId} fetched`, response.data);
      setProducts(response.data);
      setLoadingProducts(false);
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error
      );
      setLoadingProducts(false);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    await fetchProductsByCategory(categoryId);
  };

  const handleAddToCart = async (productId) => {
    try {
      // Execute API to add product to cart
      const token = Cookies.get('token');
      toast("Item Added!!");
      const response = await axios.post(`${process.env.API_URL}/api/cart/add`, {
        productId: productId,
        quantity: 1, // Default quantity
      },{headers:{"Authorization":token}});
      console.log("Product added to cart:", response.data);
      // You can optionally show a success message or update the UI in response to the successful addition
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // You can handle errors and display error messages to the user
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 mx-4">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li
                key={category.category_id}
                onClick={() => handleCategoryClick(category.category_id)}
                className={`cursor-pointer ${
                  selectedCategory === category.category_id
                    ? "font-bold text-red-600"
                    : ""
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-3/4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : (
          <>
            {products.length === 0 && (
              <p className="text-red-500 ">--- Please select category first ---</p>
            )}
            {products.map((product) => (
              <div
                key={product.product_id}
                className="border p-4 rounded-lg mb-4 w-64"
              >
                <Link
                  key={product.id}
                  href={`pages/products/${product.product_id}`}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-gray-300">{product.description}</p>
                <p className="text-white font-bold mt-2">${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product.product_id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
