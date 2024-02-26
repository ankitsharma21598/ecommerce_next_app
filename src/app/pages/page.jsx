"use client"
// pages/index.js
import { useEffect } from "react";
import Header from '../components/Header';
import Products from './products/page';
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  useEffect(() => {
    const token = Cookies.get("token");
    if(token){
      toast("Login Sucessfully!!")
    }else{
      toast("Please Login!!")
    }
  }, [])

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl text-center font-bold mb-8">Welcome to Ecommerce Site</h1>
        <Products></Products>
      </div>
    </div>
  );
};

export default Home;
