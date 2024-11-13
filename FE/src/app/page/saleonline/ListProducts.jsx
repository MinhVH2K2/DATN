import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import apiProduct from '../../api/axiosProduct'
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../reducer/productSlice';
export default function ListProducts() {
    const [pageNo, setpageNo] = useState(1)
    const [categories, setcategories] = useState("")
    const [name, setname] = useState("")
    const [listProduct, setlistProduct] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        console.log(productId)
    };
    useEffect(() => {
        // Dispatch action để lưu danh sách sản phẩm vào Redux
        dispatch(setProducts(listProduct));
    }, [dispatch, listProduct]);

    useEffect(() => {
        const getListProducts = async () => {
            const response = await apiProduct.getAllProDuctsByMutipleColums(categories, name, pageNo);
            setlistProduct(response.data.data)
        }
        getListProducts()
    }, [pageNo])
    console.log(listProduct)
    return (
        <div>
            <div className='my-10'>
                <div className=' flex justify-center text-center py-8 text-3xl gap-2 items-center mb-3'>
                    <p className='text-gray-500'>DANH SÁCH SẢN PHẨM</p>

                </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ' >
                {listProduct.map(
                    (item) => (

                        <div key={item.productId} onClick={() => handleProductClick(item.productId)} className="cursor-pointer">
                            <ProductItem
                                name={item.productName}
                                image={item.productIng}
                                price={item.unitPrice}
                            />
                        </div>
                    )
                )

                }

            </div>
            <div>
                <Pagination className='h-10 flex justify-center pt-2' defaultCurrent={pageNo} total={50} />;
            </div>

        </div>
    )
}
