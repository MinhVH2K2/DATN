import React from 'react'

export default function Footer() {
    return (
        <div>
            <div className='flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img className='h-14 w-14' src="assets/img/logo.png" alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi architecto possimus sapiente. Earum assumenda culpa dignissimos optio minus necessitatibus a rerum, quisquam ullam architecto expedita laudantium vitae odio quasi totam!
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col text-gray-600 gap-1'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>

                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET TO TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li> 035507170</li>
                        <li> contact@heavenshop.com</li>
                    </ul>
                </div>


            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>CopyRight 2024@ heavenshop.com - All Right Reserved</p>
            </div>
        </div>
    )
}
