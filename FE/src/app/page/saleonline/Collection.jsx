import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import apiProduct from '../../api/axiosProduct'
import ProductItem from './ProductItem'
export default function Collection() {
  const [fillter, setfillter] = useState("")
  const [selected, setSelected] = useState(null);
  const [pageNo, setpageNo] = useState(1)
  const [listProduct, setlistProduct] = useState([])
  const handleCheckboxChange = (index, e) => {
    setSelected(index);
  };
  useEffect(() => {
    const getListProducts = async () => {
      const response = await apiProduct.getAllProDuctsByMutipleColums(fillter, pageNo);
      setlistProduct(response.data.data)
    }
    getListProducts()
  }, [pageNo,fillter])
  const toggleCategory = (e) => {

    setfillter(e.target.value)
  }
  const handleChange = (value, e) => {
    handleCheckboxChange(value);

    toggleCategory(e);
  };
  return (
    <div className='container pl-10 pr-10'>
      <Navbar />
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        <div className='min-w-60 '>
          <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILLTER</p>
          <div className='border border-gray-300 pl-5 py-3 mt-6 '>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
              <p className='flex gap-2 '>
                <input className='w-3' type="radio" value={""} checked={selected === 0} onChange={(e) => handleChange(0,e)} /> Tất Cả
              </p>
              <p className='flex gap-2 '>
                <input className='w-3' type="radio" value={"Quần"} checked={selected === 1} onChange={(e) => handleChange(1,e)} /> Quần
              </p>
              <p className='flex gap-2 '>
                <input className='w-3' type="radio" value={"Áo"} checked={selected === 2} onChange={(e) => handleChange(2,e)} /> Áo
              </p>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ' >
              {listProduct.map(
                (items) => (
                  <ProductItem key={items.productId} name={items.productName} image={items.productIng} price={items.unitPrice} />
                )
              )

              }

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
