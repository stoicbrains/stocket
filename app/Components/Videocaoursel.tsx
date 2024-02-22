
import React, { useState } from 'react';
import img1 from '../assets/images/giphy.gif'
import img2 from '../assets/images/second.gif'
import Image from 'next/image';
const videoArr = [
  { id: 1, url: img1 },
  { id: 2, url: img2 },
];

const Videocaoursel = () => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [trigger,setTrigger] = useState(true);
  return (
    <React.Fragment>
      <div className='h-[35rem] w-[90vw] rounded-3xl relative left-[50%] translate-x-[-50%] top-5 bg-slate-500 overflow-hidden'>
        <div className='h-full w-full relative'>
          {videoArr.map((video, i) => (
            <Image
              src={video.url}
              alt=''
              width={1200}
              height={900}
              className={`h-full w-full object-top absolute top-0 left-0 transition-all duration-700 delay-75 ease-out ${
                selectedVideoIndex === i ? 'opacity-1 ' : 'opacity-0 left-[100%]'
              }`}
            />
              
          ))}
          <div className='h-[5rem] w-[10rem] absolute bottom-[1rem] left-[50%] translate-x-[-50%] flex justify-center items-center gap-[0.6rem]'>
            {videoArr.map((video, i) => (
              <button
                key={video.id}
                className={`h-[20px] w-[20px] rounded-[50%] bg-white ${
                  selectedVideoIndex === i ? 'opacity-[0.7]' : 'opacity-[0.3]'
                }`}
                onClick={() => {
                  setSelectedVideoIndex(i);
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Videocaoursel;
