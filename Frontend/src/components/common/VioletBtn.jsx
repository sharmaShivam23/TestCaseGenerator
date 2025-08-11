import React from 'react'

const VioletBtn = ({text}) => {
  return (
    <div className='h-[40px] hover:scale-105 transition-all ease-out duration-300 max-w-max border-[#8A4CEF] border-1 rounded-xl px-8 font-bold text-lg flex justify-center items-center bg-[linear-gradient(to_left,_#6E27E0_70%,_#460F9E_100%)]'>
      {text}
    </div>
  )
}

export default VioletBtn
