import React from 'react';
import Image from 'next/image';
import img1 from '../assets/images/three.jpg';
import img2 from '../assets/images/four.avif'; // Import these images if needed
import img3 from '../assets/images/smart-watch.jpg'; // Import these images if needed

const Card = () => {
  return (
    <div className='h-screen w-[90vw] m-auto bg-[#ffffff]'>
      <h1 className='text-3xl text-black font-semibold tracking-wider relative text-center translate-y-[2rem] m-5 mb-[50px]'>
        Explore!
      </h1>
      <div className='h-[60vh] w-full grid grid-cols-3 bg-black gap-[1rem] justify-center items-center p-5 rounded-2xl overflow-hidden'>
        <div className='bg-white h-full rounded-[12px] object-cover overflow-hidden'>
          <Image src={img1} alt='' objectFit='cover' objectPosition='center' style={{height:"100%",position:'relative'}}/>
        </div>
        <div className='bg-white h-full rounded-[12px] overflow-hidden'>
        <Image src={img2} objectFit='cover' alt='' style={{height:'100%'}}/>
        </div>
        <div className='bg-white h-full rounded-[12px]'>
      <Image src={img3} alt='' objectFit='cover' style={{height:'100%'}}/>
        </div>
      </div>
    </div>
  );
};

export default Card;
