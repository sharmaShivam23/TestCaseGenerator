import React from 'react'

const GrayBtn = ({text}) => {
  return (
    <div className='h-[40px] w-auto border-[#3A3A3A] border-1 rounded-xl px-8 font-bold text-lg flex justify-center items-center bg-[#1F1C1C]'>
      {text}
    </div>
  )
}

export default GrayBtn
