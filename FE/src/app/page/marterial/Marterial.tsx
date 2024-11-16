
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';



const Marterial = () => {
    const [marterial, setMarterial] = useState([]);

    const geitAllMarterial = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const repon = await axios.get(`http://localhost:8081/Marterial/getAll-marterial`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMarterial(repon.data);
            console.log(repon.data);
        } catch (er) {

        }
    }

    useEffect(() => {
        geitAllMarterial();
    }, [])



    return <>
        <h1>Marterial</h1>
        <Button type="primary" >Material Add</Button>
        <div className="card">
            <DataTable value={marterial} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="materialId" header="Marterial id " style={{ width: '25%' }} ></Column>
                <Column field="materialName" header="material Name " style={{ width: '25%' }} ></Column>
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
    export default Marterial;