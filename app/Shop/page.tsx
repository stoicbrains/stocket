// Import necessary Firebase SDKs
"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { app } from '../firebase';
import Navbar from "../Components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import fifteen from "../assets/images/Product/nfhead.jpg";
import fourteen from "../assets/images/Product/music.jpg";
import thirteen from "../assets/images/Product/multiport.jpg";
import twelve from "../assets/images/Product/mic.jpg";
import eleven from "../assets/images/Product/eco.jpg";
import ten from "../assets/images/Product/breded.jpg";
import nine from "../assets/images/Product/blood.jpg";
import  eight from "../assets/images/Product/overear.jpg";
import seven from "../assets/images/Product/quickCharge.jpg";
import six from "../assets/images/Product/retro spe.jpg";
import five from "../assets/images/Product/slim.jpg";
import four from "../assets/images/Product/smarthome.jpg";
import three from "../assets/images/Product/smartwatch1.jpg";
import two from "../assets/images/Product/surround.jpg";
import one from "../assets/images/Product/watch.jpg";


const db = getFirestore(app);

const Page = () => {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [desc, setDesc] = useState("");

  const [queries, setQueries] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(e.target.value);
  };

  const desChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const onSubmit = async () => {
    await addDoc(collection(db, "questions"), {
      question: newTitle,
      price: newPrice,
      timestamp: new Date(),
      desc: desc,
    });

    setNewTitle("");
    setNewPrice("");
    setDesc("");
  };

  const addToCart = async (query: any) => {
    // Add the item to the "products" collection
    await addDoc(collection(db, "products"), {
      name: query.question,
      price: query.price,
      timestamp: new Date(),
    });
    
    // Update the state to reflect the added item in the cart
    setCartItems((prevCartItems) => [...prevCartItems, { name: query.question, price: query.price }]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(query(collection(db, "questions"), orderBy("timestamp", "desc")), (snapshot) => {
        const questions = snapshot.docs.map((doc) => ({
          id: doc.id,
          question: doc.data().question,
          price: doc.data().price,
          desc: doc.data().desc,
        }));

        setQueries(questions);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="absolute top-[8rem] left-[50%] translate-x-[-50%] h-[80vh] w-[80vw] rounded-xl bg-[#6413E8] overflow-y-scroll scroll-smooth p-10" style={{ scrollbarWidth: 'thin' }}>
        {/* <form action="">
          <div className="flex justify-center items-center gap-[3rem] my-3">
            <input
              name="Question"
              id="new"
              value={newTitle}
              onChange={onChange}
              placeholder="name"
              className="bg-white text-black text-center rounded-lg h-[50px] w-[200px]"
            />
            <input
              type="text"
              value={newPrice}
              onChange={onPriceChange}
              className="bg-white text-black text-center rounded-lg h-[50px] w-[200px]"
              placeholder="Price"
            />
            <textarea name="text" id="text" className="h-[70px] w-[400px] rounded-lg bg-white text-black resize-none" onChange={desChange} value={desc}></textarea>
            <button
              type="button"
              onClick={onSubmit}
              className="h-[50px] text-white w-[70px] bg-[#76E1DE] rounded-lg font-semibold hover:bg-violet-400 transition-all duration-150"
            >
              Publish
            </button>
          </div>
        </form> */}

        <div>
          <ul className="w-[100%] h-[100%] relative left-[50%] translate-x-[-50%] text-black text-lg flex flex-col gap-[4rem] justify-center items-center">
            <div className="absolute h-[300px] w-[300px] top-[1.1rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={one} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[25rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={two} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[49rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={three} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[73rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={four} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[96.5rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={five} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[121rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={six} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[145rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={seven} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[169rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={eight} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[193rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={nine} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[217rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={ten} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[241rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={eleven} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[265rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={twelve} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[289rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={thirteen} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[313rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={fourteen} alt="" objectFit="cover" style={{height:'100%'}}/></div>
            <div className="absolute h-[300px] w-[300px] top-[337rem] left-[1rem] bg-white rounded-xl overflow-hidden"><Image src={fifteen} alt="" objectFit="cover" style={{height:'100%'}}/></div>

            {queries.map((query) => (
              <li
                key={query.id}
                className="bg-[#38CFFF] text-black h-[20rem] w-[60%] rounded-xl p-[2rem] relative right-[-10rem]"
              >
                <div className="flex flex-col justify-start items-center h-full w-full gap-1 text-black">
                  <p className="rounded-xl w-[80%]  text-sm text-center p-[5px] ">{query.question}</p>
                  <div className="w-full h-[0.1px] "></div>
                  <p className="rounded-xl w-[80%]  text-sm text-center ">{query.price}</p>
                  <div className="w-full h-[0.1px] "></div>
                  <p className="rounded-xl w-[80%]  text-[11px] text-center ">{query.desc}</p>
                  <button className="text-sm bg-[#76E1DE] h-[40px] w-[200px] rounded-xl my-[0.5rem] transition-all duration-300 ease-in-out before:transition-all hover:scale-[1.1] before:duration-500 before:ease-out relative overflow-hidden z-[1] before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-violet-400 hover:before:w-full before:z-[-1] " onClick={() => addToCart(query)}>
                    Add to cart
                  </button>
                </div>
                <div className="h-[40px] w-[70px] relative left-[102%] bottom-[60%] z-50">
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;


