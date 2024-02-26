"use client";
// pages/products/[productId].js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const ProductDetailPage = ({ params }) => {
  // const router = useRouter();

  const { productId } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/products/${productId}`
        );
        console.log("Product fetched", response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = async (productId) => {
    try {
      // Execute API to add product to cart
      toast("Item Added!!");
      const token = Cookies.get('token');
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
    <div>
      <Header />
      <ToastContainer/>
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="max-w-md p-8 border rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-300">{product.description}</p>
          <p className="text-gray-400 font-bold mt-2">${product.price}</p>
          <button onClick={() => handleAddToCart(product.product_id)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
