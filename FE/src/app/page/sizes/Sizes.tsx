
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';


const Sizes = () => {

    const [sizes, setSizes] = useState([]);
    const [modalAddSizes, setModalAddSizes] = useState(false);
    const [form] = Form.useForm();

    const geitAllSizes = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const repon = await axios.get(`http://localhost:8081/sizes/getAll-sizes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSizes(repon.data);
            console.log(repon.data);
        } catch (er) {

        }
    }

    const addSizes = async (values: any) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:8081/sizes/add-sizes', values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            geitAllSizes();
        } catch (error) {
            console.error('Error adding color:', error);
        }
    };

    useEffect(() => {
        geitAllSizes();
    }, [])
    const isAddSizesModal = () => {

    }

    const modalAddopen = () => {
        setModalAddSizes(true);
    }
    const modalAddoff = () => {
        setModalAddSizes(false);

    }
    const AddSizesForm = (values: any) => {
        addSizes(values);
        modalAddoff();
        form.resetFields();
    }
    return <>
        <h1>Sizes</h1>

        <Button type="primary" onClick={() => modalAddopen()}>Color Add</Button>
        <div className="card">
            <DataTable value={sizes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="sizesId" header="Sizes id " style={{ width: '25%' }} ></Column>
                <Column field="sizesName" header="Sizes Name " style={{ width: '25%' }} ></Column>
                <Column header="Action" body={(rowData) => (
                    <>
                        <Button className="p-button-success" >update</Button>
                        <Button className="p-button-danger" >delete</Button>
                    </>
                )} style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
        <div>
            <Modal
                title='Sizes Add'
                visible={modalAddSizes}
                onCancel={modalAddoff}
                footer={null}
            >
                <Form
                    form={form}
                    name="my_modal_form"
                    onFinish={AddSizesForm}
                    layout="vertical"
                >
                    <Form.Item
                        name="sizesName"
                        label="Sizes Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    </>

}
export default Sizes;









