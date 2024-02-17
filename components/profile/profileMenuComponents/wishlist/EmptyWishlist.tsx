import React from 'react'
import Link from 'next/link'
import { IoMdHeart } from "react-icons/io";

const EmptyWishlist = () => {
  return (
    <section>
      <div className="w-full py-4 px-5 bg-custom2 rounded-lg flex items-center gap-3 text-white ">
        <IoMdHeart className="text-[18px]" />
        <p className="text-sm font-semibold">
          Your wishlist is currenly empty.
        </p>
      </div>
    </section>
  )
}

export default EmptyWishlist