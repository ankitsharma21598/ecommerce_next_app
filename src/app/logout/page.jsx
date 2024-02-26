"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    toast("Logout Sucessfully!!")
    // Clear authentication token from cookies
    Cookies.remove("token");
    // Redirect to the login page
    router.push("/login");
  }, []);

  return null; // Or you can render a message indicating that the user is being logged out
};

export default LogoutPage;
