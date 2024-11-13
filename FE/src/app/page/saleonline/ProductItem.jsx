import React from 'react'
import { Link } from 'react-router-dom'
export default function ProductItem({id, image, name, price}) {
    return (
        <div>
            <Link className='text-gray-700 cursor-pointer'>
                <div className='overflow-hidden'>
                    <img className='hover:scale-110 transition ease-in-out ' src={image} alt="" />
                </div>
                <p className='pt-3 pb-1 text-sm'>{name}</p>
                <p className='font-medium text-sm'>{price}VND</p>
            </Link>
        </div>
    )
}

