import React from 'react'

const FlashCard = ({text1, text2}) => {
  return (
    <>
    <div class="rounded-xl bg-white shadow-lg shadow-gray-300 overflow-hidden">
      <img src="https://pagedone.io/asset/uploads/1688025668.png" alt="image"/>
      <div class="w-full p-6 ">
        <h5 class="text-xl font-semibold font-manrope text-gray-900 mb-4">Hand made bottles</h5>
        <p class="text-sm font-medium text-gray-600"> {text1} </p>
        <p class="text-sm font-medium text-gray-600"> {text2} </p>
      </div>
      </div>
    </>
  )
}

export default FlashCard