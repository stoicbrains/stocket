"use client"
import Navbar from './Components/Navbar'
import Videocaoursel from './Components/Videocaoursel'
import React from 'react'
import Card from './Components/card'

const index = () => {
  return (
    <div className='overflow-x-hidden scroll-smooth overflow-hidden' >
     
      <Navbar/>
      <Videocaoursel/>
      <Card/>
    </div>
  )
}

export default index
