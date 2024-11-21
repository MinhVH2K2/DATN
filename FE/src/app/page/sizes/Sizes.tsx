
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';


const Sizes = () => {

    const [sizes, setSizes] = useState<Size[]>([]);
    const [modalAddSizes, setModalAddSizes] = useState(false);
    const [modalUpdateSizes, setModalUpdateSizes] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [form] = Form.useForm();
    interface Size {
        sizesId: number; // Hoặc string nếu ID là chuỗi
        sizesName: string;
    }
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
    const sizeDelete = async (id: any) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.delete(`http://localhost:8081/sizes/delete-sizes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            geitAllSizes();
        } catch (error) {
            console.log("delete color : " + error);
        }
    }
    const sizesUpdate = async (values: any) => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.put('http://localhost:8081/sizes/update-sizes', values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            geitAllSizes();
        } catch (e) {
            console.error("error update :" + e);
        }
    }

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
    const DeleteSize = (id: any) => {
        sizeDelete(id.sizesId);

    }
    const updateModalOpen = (values: any) => {
        console.log("data update size : " + values.sizesId)
        form.setFieldsValue({
            sizesId: values.sizesId,
            sizesName: values.sizesName
        });
        setModalUpdateSizes(true);
    }
    const updateModalOff = () => {
        setModalUpdateSizes(false);
    }
    const UpdateSizes = async (values: any) => {
        console.log("dataupdate size" + values);
        sizesUpdate(values);
        updateModalOff();
    }
    const filteredSizes = sizes.filter(size => {
        const lowerCasedSearchTerm = searchTerm.toLowerCase();
        return (
            String(size.sizesId).toLowerCase().includes(lowerCasedSearchTerm) || // Tìm theo sizesId
            size.sizesName.toLowerCase().includes(lowerCasedSearchTerm) // Tìm theo sizesName
        );
    });
    return <>
        <h1>Sizes</h1>


        <Button type="primary" onClick={() => modalAddopen()}>Color Add</Button>
        <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '20px' , width:'300px'}}
            
        />
        <div className="card">
            <DataTable value={filteredSizes}
                paginator   
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}>
                <Column field="sizesId" header="Sizes id " style={{ width: '25%' }} ></Column>
                <Column field="sizesName" header="Sizes Name " style={{ width: '25%' }} ></Column>
                <Column header="Action" body={(rowData) => (
                    <>
                        <Button className="p-button-success" onClick={() => updateModalOpen(rowData)} >update</Button>
                        <Button className="p-button-danger" onClick={() => DeleteSize(rowData)} >delete</Button>
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
            {/* modal update sizes  */}
            <Modal
                title='Sizes Update'
                visible={modalUpdateSizes}
                onCancel={updateModalOff}
                footer={null}
            >
                <Form
                    form={form}
                    name="my_modal_form"
                    onFinish={UpdateSizes}
                    layout="vertical"
                >
                    <Form.Item
                        name="sizesId"
                        label="Sizes Id"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
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









