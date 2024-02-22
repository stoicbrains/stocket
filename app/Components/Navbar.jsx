import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { app } from "../firebase";
import bin from "../assets/images/bin.png";
import { useRouter } from "next/navigation";



const Navbar = () => {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [count1, setCount1] = useState(1);

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
    const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    setTotal(cartItems.reduce((acc, item) => acc + parseInt(item.price.replace("Rs ", "")) * count1, 0));
  }, [count1, cartItems]);

  return (
    <motion.div
      className={`fixed z-10 transition-all duration-500 linear ${
        scrollProgress > 10 ? "opacity-70" : "opacity-1"
      }`}
    >
      <nav>
        <div className="h-16 w-screen bg-[#fefae0] flex justify-between items-center relative">
          <Link href={"/"}>
            <div className="text-gray-950 text-4xl font-semibold tracking-[8px] float-left p-4 cursor-pointer">
              Socket
            </div>
          </Link>
          <div className=" text-xl font-semibold translate-x-[-30rem]">
            <Link href={"/Shop"}>Shop</Link>
          </div>
          <div className="flex justify-center items-center gap-8 translate-x-[-2rem]">
            <div>
              <Image src="/path/to/login.png" alt="" height={28} width={28} />
            </div>
            <div className="cursor-pointer">
              <Image
                src="/path/to/cart.png"
                alt=""
                height={28}
                width={28}
                onClick={() => {
                  setTrigger(true);
                  router.refresh();
                }}
              />
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`w-screen backdrop-blur-sm rounded-xl transition-all duration-1000 delay-100 ease-out ${
          trigger ? "h-screen" : "translate-x-[-50rem]"
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
                  <button className="h-[40px] w-[60px] bg-black text-white text-sm rounded-xl" onClick={() => { setCount1(count1 + 1); }}>+</button>
                  {count1}
                  <button className="h-[40px] w-[60px] bg-black text-white text-sm rounded-xl" onClick={() => { setCount1(count1 - 1); }}>-</button>
                  <div>Total: {parseInt(item.price.replace("Rs ", "")) * count1}</div>
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
        </div>
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
