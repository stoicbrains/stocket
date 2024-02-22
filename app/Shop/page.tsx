"use client"
import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { app } from '../firebase';
import Navbar from "../Components/Navbar";

const db = getFirestore(app);

const Page = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [desc, setDesc] = useState("");

  const [queries, setQueries] = useState<any[]>([]);

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
      desc: desc, // Use 'desc' instead of 'Desc'
    });

    setNewTitle("");
    setNewPrice("");
    setDesc("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(query(collection(db, "questions"), orderBy("timestamp", "desc")), (snapshot) => {
        const questions = snapshot.docs.map((doc) => ({
          id: doc.id,
          question: doc.data().question,
          price: doc.data().price,
          desc: doc.data().desc, // Use 'desc' instead of 'Desc'
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
      <div className="absolute top-[8rem] left-[50%] translate-x-[-50%] h-[80vh] w-[80vw] rounded-xl bg-gray-500 overflow-y-scroll scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
        <form action="">
          <div className="flex justify-center items-center gap-[3rem] my-3">
            <input
              name="Question"
              id="new"
              value={newTitle}
              onChange={onChange}
              placeholder="name"
              className="bg-gray-900 text-white text-center rounded-lg h-[50px] w-[200px]"
            />
            <input
              type="text"
              value={newPrice}
              onChange={onPriceChange}
              className="bg-gray-900 text-white text-center rounded-lg h-[50px] w-[200px]"
              placeholder="Price"
            />
            <textarea name="text" id="text" className="h-[70px] w-[400px] rounded-lg text-white bg-gray-900 resize-none" onChange={desChange} value={desc}></textarea>
            <button
              type="button"
              onClick={onSubmit}
              className="h-[50px] text-white w-[70px] bg-purple-700 rounded-lg font-semibold hover:bg-purple-950 transition-all duration-150"
            >
              Post
            </button>
          </div>
        </form>

        <div>
          <ul className="w-[100%] h-[100%] relative left-[50%] translate-x-[-50%] text-black text-lg flex flex-col gap-[1rem] justify-center items-center">
            {queries.map((query) => (
              <li
                key={query.id}
                className="bg-gray-800 text-white h-[20rem] w-[40%] rounded-xl p-[1rem]"
              >
                <div className="flex flex-col justify-start items-center h-full w-full gap-7">
                  <p className="rounded-xl w-[80%] text-white text-sm text-center">{query.question}</p>
                  <div className="w-full h-[0.1px] bg-white"></div>
                  <p className="rounded-xl w-[80%] text-white text-sm text-center">{query.price}</p>
                  <div className="w-full h-[0.1px] bg-white"></div>
                  <p className="rounded-xl w-[80%] text-white text-sm text-center">{query.desc}</p>
                  <button className="text-sm bg-red-700 h-[40px] w-[200px] rounded-xl">Add to cart</button>
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
