import React from 'react';
import Image from 'next/image';
import img1 from '../assets/images/highPowerbank.jpg';
import img2 from '../assets/images/headphone.jpg'; // Import these images if needed
import img3 from '../assets/images/earbuds.jpg'; // Import these images if needed

import { useRouter } from 'next/navigation';
const Card = () => {
  const router = useRouter()
  return (
    <div className='h-screen w-[90vw] m-auto bg-[#ffffff]'>
      <h1 className='text-3xl text-black font-semibold tracking-wider relative text-center translate-y-[2rem] m-5 mb-[50px]'>
        Explore! our Trending products
      </h1>
      <div className='h-[60vh] w-full flex bg-black gap-[1rem] justify-center items-center p-5 rounded-2xl overflow-hidden'>
        
        <div className='bg-white h-[80%] rounded-[12px] overflow-hidden'>
          <Image src={img1} alt='' objectFit='cover' objectPosition='center' style={{height:'100%'}}/>
        </div>
        <div className='bg-white h-[80%] rounded-[12px] overflow-hidden'>
          <Image src={img2} alt='' objectFit='cover' objectPosition='center' style={{height:'100%'}}/>
        </div>
        <div className='bg-white h-[80%] rounded-[12px] overflow-hidden'>
          <Image src={img3} alt='' objectFit='cover' objectPosition='center' style={{height:'100%'}}/>
        </div>
      </div>
      <button onClick={()=>{
        router.replace('/Shop')
      }} className="text-sm bg-black text-white h-[60px] w-[200px] rounded-xl my-[2rem] left-[50%] translate-x-[-50%] transition-all duration-300 ease-in-out before:transition-all hover:scale-[1.1] before:duration-500 before:ease-out relative overflow-hidden z-[10] before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-violet-400 hover:before:w-full before:z-[-1] ">Intrested Shop now!</button>
    </div>
  );
};

export default Card;
