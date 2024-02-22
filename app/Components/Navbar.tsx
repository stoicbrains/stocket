import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import user from '../assets/images/login.png';
import cart from '../assets/images/cart.png';
import { motion } from 'framer-motion';
import Link from "next/link";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trigger ,setTrigger] = useState(false);
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

  return (
    <motion.div
      
      className={`fixed z-10 transition-all duration-500 linear ${scrollProgress > 10 ? 'opacity-70' : 'opacity-1'}`}
    >
      <nav>
        <div className="h-16 w-screen bg-[#fefae0] flex justify-between items-center relative">
          <Link href={"/"}><div className="text-gray-950 text-4xl font-semibold tracking-[8px] float-left p-4 cursor-pointer">
            Socket
          </div></Link>
          <div className=" text-xl font-semibold translate-x-[-30rem]">
            <Link href={'/Shop'}>Shop</Link>
          </div>
          <div className="flex justify-center items-center gap-8 translate-x-[-2rem]">
            <div>
              <Image src={user} alt="" height={28} width={28} />
            </div>
            <div className="cursor-pointer">
              <Image src={cart} alt="" height={28} width={28} onClick={()=>{
                setTrigger(true);
              }} />
            </div>
          </div>
          
        </div>
      </nav>
      <div className={`w-screen backdrop-blur-sm rounded-xl transition-all duration-1000 delay-100 ease-out ${trigger?'h-screen':'translate-x-[-50rem]'}`}>
      <div className={`h-[90vh] w-[40vw] rounded-[21px] absolute top-[1%] left-[20%] translate-x-[-50%] bg-white `}>
        <button className="h-[40px] w-[40px] rounded-[50%] bg-red-600 float-end translate-y-[1rem] translate-x-[-0.5rem]" onClick={()=>{setTrigger(false)}}>X</button>
      </div>
      </div>
      <motion.div
            className="h-[0.3rem] bg-sky-200 absolute bottom-[-2px] left-[50%] translate-x-[-50%] rounded-[21px]"
            initial={{ width: "0%" }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          />
    </motion.div>
   
  );
};

export default Navbar;
