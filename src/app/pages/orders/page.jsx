"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = Cookies.get("token");
        if(!token){
          toast("Please login!");
        }
        console.log("token: " + token);
        const response = await axios.get(
          `${process.env.API_URL}/api/orders/history`,
          {
            headers: { Authorization: token },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderDetails = (orderId) => {
    // Redirect to order details page for the selected order
    router.push(`/pages/products/${orderId}`);
  };

  console.log("Orders",orders);

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container mx-auto mt-8 flex justify-center">
    <div className="w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Your Placed Orders</h2>
        {loading ? (
            <p>Loading orders...</p>
        ) : (
            <>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <li key={order.orderId} className="py-4 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold">
                                        Transaction ID: {order.order_id}
                                    </span>
                                    <span className="text-sm">
                                        Total Amount: ${order.total_amount}
                                    </span>
                                    <span className="text-sm">Date: {order.created_at}</span>
                                </div>
                                <button
                                    onClick={() => order.orderItems.forEach(item => handleOrderDetails(item.product_id))}
                                    className="text-blue-500"
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </>
        )}
    </div>
</div>


    </div>
  );
};

export default OrderPage;
