// Cart.js

import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { MdOutlineDeleteOutline } from "react-icons/md";
export default function Cart() {
    const cart = useSelector((state) => state.carts.cart);
    const [quantities, setQuantities] = useState(cart.map(item => item.quantity));
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const newTotalPrice = cart.reduce((acc, item, index) => acc + item.price * quantities[index], 0);
        setTotalPrice(newTotalPrice);
    }, [quantities, cart]);

    // Handle quantity change
    const handleQuantityChange = (index, newQuantity) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = newQuantity;
        setQuantities(updatedQuantities);
    };
    return (
        <div className='border-t pt-14'>

            <div className='text-2xl mb-3'>
                <h2>Your Card</h2>
            </div>
            <div>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={index} className='py-4 border-t boder-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm: grid-col items-center gap-4'>
                            <div className='flex items-start gap-6'>
                                <img className='w-16 sm:w-20' src={item.productImg} alt="" />
                                <div>
                                    <h3 className='text-xs sm:text-lg font-medium'> {item.productName}</h3>
                                    <div className='flex items-center gap-5 mt-2'>
                                        <p> {item.price.toLocaleString()} VND</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border  bg-slate-50'> {item.size}</p>

                                    </div>
                                </div>
                            </div>
                            <input   onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                            <div className='cursor-pointer'>
                                < MdOutlineDeleteOutline />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
            {/* Display Total Price */}
            {cart.length > 0 && (
                <div className='mt-6 text-xl font-semibold text-right'>
                    <p>Total: {totalPrice.toLocaleString()} VND</p>
                </div>
            )}
        </div>
    );
}
