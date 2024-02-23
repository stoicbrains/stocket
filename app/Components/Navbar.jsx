
"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { app } from "../firebase";
import bin from "../assets/images/bin.png";
import cart from "../assets/images/cart.png"
import Logo from "../assets/images/Logo.png"
import login from "../assets/images/login.png"

import cheer from "../assets/images/cheer.gif"


const Navbar = () => {

  const [scrollProgress, setScrollProgress] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [bill,setBill] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchCartItems = async () => {
    const db = getFirestore(app);
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), count: 1 }));
    setCartItems(products);
  };

  const deleteProduct = async (productId) => {
    try {
      const db = getFirestore(app);
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      fetchCartItems(); // Refresh the cart items after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateItemCount = (productId, newCount) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => (item.id === productId ? { ...item, count: newCount } : item))
    );
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    setTotal(cartItems.reduce((acc, item) => acc + parseInt(item.price.replace("Rs ", "")) * item.count, 0));
  }, [cartItems]);

  return (
    <motion.div
      className={`fixed z-10 transition-all duration-500 linear ${
        scrollProgress > 10 ? "opacity-70" : "opacity-1"
      }`}
    >
      <nav>
        <div className="h-16 w-screen bg-[black] text-white flex justify-between items-center relative">
          <Link href={"/"}>
            <div className="text-gray-950 text-4xl font-semibold tracking-[8px] float-left p-4 cursor-pointer">
              <Image src={Logo} height={100} width={100} />
            </div>
          </Link>
          <div className=" text-xl font-semibold translate-x-[-30rem]">
            <Link href={"/Shop"}>Shop</Link>
          </div>
          <div className="flex justify-center items-center gap-8 translate-x-[-2rem]">
          <div className="flex justify-center items-center gap-8 translate-x-[-2rem]">
            <div>
              <Image src={login} alt="" height={28} width={28} />
            </div>
            <div className="cursor-pointer">
              <Image
                src={cart}
                alt=""
                height={28}
                width={28}
                onClick={() => {
                  setTrigger(true);
                 
                }}
              />
            </div>
          </div>
          </div>
        </div>
      </nav>
      <div
        className={`w-screen backdrop-blur-sm rounded-xl transition-all duration-1000 delay-100 ease-out absolute ${
          trigger ? "h-screen" : "translate-x-[-100rem]"
        }`}
      >
        <div className={`h-[90vh] w-[35vw] rounded-[21px] absolute top-[1%] left-[20%] translate-x-[-50%] bg-red-100 text-center p-[2rem]`}>
          <button
            className="h-[40px] w-[40px] rounded-[50%] bg-red-600 float-end translate-y-[-1rem] translate-x-[1rem]"
            onClick={() => {
              setTrigger(false);
              fetchCartItems();
            }}
          >
            X
          </button>
          <div>
            <h2 className="text-xl font-semibold my-2">Cart Items</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-center gap-7 items-center text-sm bg-sky-300 rounded-xl p-10 my-5">
                  {item.name}-{item.price}
                  <button className="h-[40px] w-[60px] bg-black text-white text-sm rounded-xl" onClick={() => { updateItemCount(item.id, item.count + 1); }}>+</button>
                  {item.count}
                  <button className="h-[40px] w-[60px] bg-black text-white text-sm rounded-xl" onClick={() => { updateItemCount(item.id, item.count - 1); }}>-</button>
                  <div>Total: {parseInt(item.price.replace("Rs ", "")) * item.count}</div>
                  <button
                    className="h-[40px] w-[40px] text-white text-sm rounded-xl"
                    onClick={() => deleteProduct(item.id)}
                  >
                    <Image src={bin} alt="" objectFit="cover" />
                  </button>
                </li>
              ))}
            </ul>
            Overall Total :{total}
          </div>
          <button className={`h-[40px] w-[200px] bg-orange-900 rounded-xl absolute bottom-[20px] left-[50%] translate-x-[-50%] hover:bg-orange-700 transition-all duration-300 ease-in-out`} onClick={()=>{
            setBill(true)
          }}>Place your order</button>
        </div>
        <div className={` h-screen w-screen backdrop-blur-md${bill?"":"hidden"} transition-all duration-700 ease-out`}><div className={` w-[600px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] rounded-[21px] bg-white transition-all duration-500 ease-in-out overflow-hidden ${bill?'h-[600px]':'h-0'}`} onClick={()=>{setBill(false)}}>
          
          <h1 className="text-2xl font-bold text-center p-10">Thankyou For the Purchase!</h1>
          <Image src={cheer} alt="" height={300} width={300} style={{margin:'auto'}}/>
          <h2 className="text-center m-5 text-xl">Total Bill:{total}</h2>
          </div></div>
        
        
      </div>
      <motion.div
        className="h-[0.3rem] bg-sky-200 absolute bottom-[-2px] left-[50%] translate-x-[-50%] rounded-[21px]"
        initial={{ width: "0%" }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default Navbar;

