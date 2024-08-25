import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const FlashCard = ({text1, text2, handleEditCard, handleDeleteCard, image}) => {
  return (
    <>
      <div class="rounded-xl bg-white shadow-lg shadow-gray-300 overflow-hidden relative">
      {/* <img src="https://pagedone.io/asset/uploads/1688025668.png" alt="image"/> */}
      <img src={`http://localhost:3000/${image}`} alt="image"/>
      <div class="w-full p-6 ">
        {/* <h5 class="text-xl font-semibold font-manrope text-gray-900 mb-4">Hand made bottles</h5> */}
        <p class="text-sm font-medium text-gray-600"> {text1} </p>
        <p class="text-sm font-medium text-gray-600"> {text2} </p>
      </div>
      <button
        onClick={handleEditCard}
        className="absolute top-1 left-1 px-2 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 "
      >
        {/* Edit */}
        <FaRegEdit />
      </button>

      <button
        onClick={handleDeleteCard}
        className="absolute top-1 left-9 ml-2 px-2 py-2 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 "
      >
        {/* Delete */}
        <RiDeleteBin6Line />
      </button>
      </div>
    </>
  )
}

export default FlashCard