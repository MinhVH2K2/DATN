import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';

export default function () {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [categori, setCategori] = useState([]);
   
   useEffect(() => {
      const token = localStorage.getItem('authToken');
      axios.get('http://localhost:8081/categori/getAll-categori',{
         headers: {
            Authorization: `Bearer ${token}` // Thêm token vào headers
         }
      })  // API từ Spring Boot
        .then(response => {
          setCategori(response.data);
         console.log(response.data);
        })
        .catch(error => {
          console.log('There was an error fetching the products!', error);
        });
    }, []);

  return (
    <div className='container'>
        <div>
            <h3>Product add</h3>             
            <div className="d-md-flex justify-content-between align-items-center">
                <div className='ms-auto '>
                <a onClick={()=>{navigate('/products')}} className="btn btn-primary">Back to Product</a>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <p>Product name</p>      
                    <div className="card flex justify-content-center">
                    <InputText value={value} onChange={(e) => setValue(e.target.value)} />           
                    </div>
                    <p>Description</p>          
                    <div className="card">
                    <InputText value={value} onChange={(e) => setValue(e.target.value)} />           
                    </div>
                    <p>Weight</p>          
                    <div className="card">
                    <InputText value={value} onChange={(e) => setValue(e.target.value)} />           
                    </div>
                </div>
                <div className='col-6'>
                        <p>Categori</p>
                        <div className="card flex justify-content-center">
                    <Dropdown  options={categori} optionLabel="categoriesName" 
                        placeholder="Select a Categori" className="w-full md:w-14rem" />
                    </div>
                    <p>Material</p>
                    <div className="card flex justify-content-center">
                    <Dropdown  optionLabel="name" 
                        placeholder="Select a Material" className="w-full md:w-14rem" />
                    </div>
                    <p>Brand</p>
                    <div className="card flex justify-content-center">
                    <Dropdown  optionLabel="name" 
                        placeholder="Select a Brand" className="w-full md:w-14rem" />
                    </div>
                </div>
                </div>   
            
           
            
        </div>
    </div>
  )
}
