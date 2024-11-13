import React from 'react'

export default function Hero() {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex  items-center gap-2 '>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>HEAVEN SHOP</p>

                    </div>
                </div>
            </div>
            <img className='w-full sm:w-1/2'src="https://aristino.com/Data/upload/images/BANNER/BST-2024/Banner-website_Aristino-PC-1920x900px.png" alt="" />
        </div>
    )
}
