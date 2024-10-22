import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
        

export default function Product() {
   const navigate = useNavigate();
   const [products, setProducts] = useState([]);
   useEffect(() => {
      axios.get('http://localhost:8081/product/getall')  // API từ Spring Boot
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.log('There was an error fetching the products!', error);
        });
    }, []);
    console.log(products);
  return (
    <>
        <div className="container">
               <div className="row mb-8">
                  <div className="col-md-12">                   
                     <div className="d-md-flex justify-content-between align-items-center">
                        <div>
                           <h2>Products</h2>                         
                           <nav aria-label="breadcrumb">
                              <ol className="breadcrumb mb-0">
                                 <li className="breadcrumb-item"><a href="#" className="text-inherit">Dashboard</a></li>
                                 <li className="breadcrumb-item active" aria-current="page">Products</li>
                              </ol>
                           </nav>
                        </div>                      
                        <div>
                           <a onClick={()=>{navigate('/product-add')}} className="btn btn-primary">Add Product</a>
                        </div>
                     </div>
                  </div>
               </div>            
               <div className="row">
                  <div className="col-xl-12 col-12 mb-5">               
                     <div className="card h-100 card-lg">
                        <div className="px-6 py-6">
                           <div className="row justify-content-between">                            
                              <div className="col-lg-4 col-md-6 col-12 mb-2 mb-lg-0">
                                 <form className="d-flex" role="search">
                                    <input className="form-control" type="search" placeholder="Search Products" aria-label="Search" />
                                 </form>
                              </div>                          
                              <div className="col-lg-2 col-md-4 col-12">
                                 <select className="form-select">
                                    <option selected>Status</option>
                                    <option value="1">Active</option>
                                    <option value="2">Deactive</option>
                                    <option value="3">Draft</option>
                                 </select>
                              </div>
                           </div>
                        </div>                     
                        <div className="card">
                              <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                                 <Column field="code" header="Code"></Column>
                                 <Column field="name" header="Name"></Column>
                                 <Column field="category" header="Category"></Column>
                                 <Column field="quantity" header="Quantity"></Column>
                              </DataTable>
        </div>
                        <div className="border-top d-md-flex justify-content-between align-items-center px-6 py-6">
                           <span>Showing 1 to 8 of 12 entries</span>
                           <nav className="mt-2 mt-md-0">
                              <ul className="pagination mb-0">
                                 <li className="page-item disabled"><a className="page-link" href="#!">Previous</a></li>
                                 <li className="page-item"><a className="page-link active" href="#!">1</a></li>
                                 <li className="page-item"><a className="page-link" href="#!">2</a></li>
                                 <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                 <li className="page-item"><a className="page-link" href="#!">Next</a></li>
                              </ul>
                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
    </>
  )
}
