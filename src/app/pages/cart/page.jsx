"use client";
// pages/cart.js

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch cart data from the backend API
        const token = Cookies.get("token");
        if (!token) {
          toast("Please login!");
        }
        const response = await axios.get(`${process.env.API_URL}/api/cart`, {
          headers: { Authorization: token },
        });
        // Extract product IDs from cart items
        const productIds = response.data.map((item) => item.product_id);
        // Fetch products using product IDs
        const productResponses = await Promise.all(
          productIds.map((product_id) =>
            axios.get(`${process.env.API_URL}/api/products/${product_id}`)
          )
        );
        // Extract product data from responses
        const productsData = productResponses.map((response) => response.data);
        // Update cart items with product details
        const updatedCartItems = response.data.map((item, index) => ({
          ...item,
          product: productsData[index],
        }));
        console.log("Updated cart items", updatedCartItems);
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      toast("Item Removed!!");
      const token = Cookies.get("token");
      await axios.delete(
        `${process.env.API_URL}/api/cart/remove/${productId}`,
        { headers: { Authorization: token } }
      ); // Replace with your actual API endpoint
      // Update cart items after removal
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.productId !== productId)
      );
      window.location.reload();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleQuantityChange = async (cartId, newQuantity) => {
    try {
      toast("Item Updated!!");
      console.log(cartId);
      const token = Cookies.get("token");
      // Send a request to update the quantity of the item in the cart
      await axios.patch(
        `${process.env.API_URL}/api/cart/update`,
        {
          cartId: cartId,
          quantity: newQuantity,
        },
        { headers: { Authorization: token } }
      );
      // Update the quantity of the item in the cart items state
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item.cart_id === cartId) {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleBuy = async () => {
    try {
      const token = Cookies.get("token");
      // Send a POST request to create an order
      const response = await axios.post(
        `${process.env.API_URL}/api/orders/place`,
        {},
        { headers: { Authorization: token } }
      );
      toast("Order Placed!!");
      // window.location.reload();
      router.push('/payment')
      console.log("Successfully created order", response.data.orderId);
      // Redirect to the order confirmation page or handle success as needed
      // router.push(`/orders/${response.data.orderId}`);
    } catch (error) {
      toast("One item at a time Order!!");
      console.error("Error creating order:", error);
    }
  };

  console.log("Cart items", cartItems);

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container mx-auto mt-8 ">
        <h2 className="mx-8 text-2xl font-bold mb-4">Shopping Cart</h2>
        {loading ? (
          <p>Loading cart...</p>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="mb-2">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className=" text-center border rounded-lg p-8 mb-4 mx-80"
                  >
                    <p className="text-lg font-semibold">
                      {item.product.title}
                    </p>
                    <p className="text-lg font-semibold">
                      {item.product.description}
                    </p>
                    <p className="text-lg font-semibold">
                      ${item.product.price}
                    </p>
                    <div className=" items-center mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.cart_id,
                            parseInt(e.target.value)
                          )
                        }
                        className="mr-2 border text-black rounded px-2 py-1 w-16"
                      />
                      <button
                        onClick={() => handleRemoveFromCart(item.cart_id)}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end">
                  {" "}
                  {/* Flex container to align button to the right */}
                  <button
                    onClick={handleBuy}
                    className="bg-blue-500 mx-80 text-white py-2 px-4 rounded"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
