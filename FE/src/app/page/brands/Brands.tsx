import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';



const Brands = () => {

    const [brands, setBrands] = useState([]);


    const geitAllBrands = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const repon = await axios.get(`http://localhost:8081/Brands/getAll-brands`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBrands(repon.data);
            console.log(repon.data);
        } catch (er) {

        }
    }

    useEffect(() => {
        geitAllBrands();
    }, [])


    return <>
        <h1>Brands</h1>
        <Button type="primary" >Material Add</Button>
        <div className="card">
            <DataTable value={brands} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="brandId" header="Brands id " style={{ width: '25%' }} ></Column>
                <Column field="brandName" header="Brands Name " style={{ width: '25%' }} ></Column>
                <Column field="brandLogo" header="Brands Logo" style={{ width: '25%' }} ></Column>
                <Column header="Action" body={(rowData) => (
                    <>
                        <Button className="p-button-success" >update</Button>
                        <Button className="p-button-danger" >delete</Button>
                    </>
                )} style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
        
    </>
}
export default Brands;