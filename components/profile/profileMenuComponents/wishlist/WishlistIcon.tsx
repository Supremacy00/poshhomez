'use client'
import React, { useState, useEffect } from 'react';
import { useWishlist } from '@/contexts/wishlistContext/WishlistContext';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

interface WishlistIconProps {
    propertyId: number;
}

const WishlistIcon: React.FC<WishlistIconProps> = ({ propertyId }) => {
    const { isItemInWishlist } = useWishlist();
    const [isInWishlist, setIsInWishlist] = useState(isItemInWishlist(propertyId));

    useEffect(() => {
        setIsInWishlist(isItemInWishlist(propertyId));
    }, [isItemInWishlist, propertyId]);

    return (
        <div className='absolute inset-[9px]'>{isInWishlist ? (
            <IoMdHeart className="text-custom2"/>
        ) : (
            <IoMdHeartEmpty />
        )}</div>
    );
}

export default WishlistIcon;
