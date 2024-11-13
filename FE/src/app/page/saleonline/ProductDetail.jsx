import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';
import { addToCart } from '../../utils/cartAction'
export default function ProductDetail() {
    const { productId } = useParams();
    const listProduct = useSelector((state) => state.products.listProduct);
    const [sizes, setSizes] = useState(null)
    const dispatch = useDispatch();
  
    // Tìm sản phẩm dựa trên productId
    const product = listProduct.find(item => item.productId === productId);
    console.log(product.productDetails)
    const uniqueSizes = Array.from(
        new Set(product.productDetails?.map(item => item.sizes.sizesName))
    );
    const uniqueColor = Array.from(
        new Set(product.productDetails?.map(item => item.colors.corlorName))
    );
    console.log(uniqueColor)
    const handleAddToCart = () => {
        if (sizes) {
            // Add the selected size and product info to the cart
            const selectedProduct = {
                productImg :product.productIng,
                productId: product.productId,
                productName: product.productName,
                size: sizes,
                price: product.unitPrice,
                image: product.productIng,
            };
            dispatch(addToCart(selectedProduct));
        } else {
            alert('Please select a size');
        }
    };
    if (!product) {
        return <p>Không tìm thấy sản phẩm!</p>;
    }
    console.log(product)
    return (
        <div className='container pl-10 pr-10'>
            <Navbar />
            <div className='bordert-t-2 pt-5 transition-opacity ease-in duration-500 opacity-100'>
                <div className='flex gap-12 sm:gap-12 flex-col  sm:flex-row '>
                    <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
                        <div className='flex sm:flex-col overflow-x-auto sm: overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                            <img key={product.productId} src={product.productIng} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                        </div>
                        <div className='w-full sm:w-[80%]'>
                            <img className='w-full  h-96' src={product.productIng} alt="" />

                        </div>

                    </div>
                    <div className='flex-1'>
                        <h1 className='font-medium text-2xl mt-2'>{product.productName}</h1>
                        <p className='mt-5 text-3xl font-medium'>{product.unitPrice}VND</p>
                        <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
                        <div className='flex flex-col gap-4 my-8'>
                            <p>Select Color</p>
                            <div>
                                
                                {uniqueColor.map((colorName, index) => (
                                    <button className={`bg-${colorName}-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  `} key={index}>
                                        {colorName}
                                    </button>
                                ))}
                            </div>
                            <p>Select Size</p>
                            <div className='flex gap-2'>
                                {uniqueSizes.map((sizeName, index) => (
                                    <button onClick={() => setSizes(sizeName)} className={`border py-2 px-4 bg-gray-100 ${sizeName === sizes ? "border-black" : ""}`} key={index}>
                                        {sizeName}
                                    </button>
                                ))}
                            </div>

                            <div >
                                <button onClick={handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'> ADD TO CART</button>
                                <hr className='mt-8 sm:w-4/5' />
                            </div>
                            <div className='text-sm text-gray-500 mt-3 flex flex-col gap-1'>
                                <p>100% Origin product .</p>
                                <p>Cash on delivery is available on this product.</p>
                                <p>Easy return and exchage policy within 7 days</p>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>


    )
}
