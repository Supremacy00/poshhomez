import React from 'react'
import { ButtonProps } from '@/@types';
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";


const PrevButton: React.FC<ButtonProps> = ({onClick}) => {
  return (
    <div className="transform -translate-y-1/2 z-30">
     <div className="group">
     <button
        onClick={onClick}
        className="bg-transparent rounded-full p-3 border-[1.5px] border-gray-200 group-hover:bg-white transition-all delay-100 ease-in-out duration-200"
      >
        <LiaLongArrowAltLeftSolid className="text-white text-[25px] group-hover:text-primary-text transition-all delay-100 ease-in-out duration-200" />
      </button>
     </div>
    </div>
  )
}

export default PrevButton