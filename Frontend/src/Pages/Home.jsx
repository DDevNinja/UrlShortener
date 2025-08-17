import React from 'react'
import UrlForm from '../Components/UrlForm'
import CustomUrlForm from '../Components/CustomUrlForm'

function Home() {
  return (
    <>
     <div className=" flex flex-col items-center  bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
        <UrlForm/>
       </div>
    </div>
     <div className=" flex flex-col items-center  bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
       <CustomUrlForm/>
       </div>
    </div>
    </>
  )
}

export default Home