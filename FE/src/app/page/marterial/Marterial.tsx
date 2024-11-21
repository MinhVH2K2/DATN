
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';



const Marterial = () => {
    const [marterial, setMarterial] = useState<marterials[]>([]);
    const [modalAddMarterial, setModalAddMarterial] = useState(false);
    const [modalUpdateMarterial, setModalUpdateMarterial] = useState(false);
    const [searchMarterial, setSearchMarterial] = useState('');
    const [form] = Form.useForm();


    interface marterials {
        materialId: Number,
        materialName: String
    }

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
    };
    const addMaterialApi = async (values: any) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:8081/Marterial/add-marterial', values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            geitAllMarterial();
        } catch (error) {
            console.error('Error adding color:', error);
        }
    };
    const materialDeleteApi = async (id: any) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.delete(`http://localhost:8081/Marterial/delete-marteiral/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            geitAllMarterial();
        } catch (error) {
            console.log("delete color : " + error);
        }
    }
    const materialUpdateApi = async (values: any) => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.put('http://localhost:8081/Marterial/update-marteiral', values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            geitAllMarterial();
        } catch (e) {
            console.error("error update :" + e);
        }
    }

    useEffect(() => {
        geitAllMarterial();
    }, [])

    const modalAdd = () => {
        setModalAddMarterial(true);
    }
    const modalAddOff = () => {
        setModalAddMarterial(false);
    }
    const addMaterial = (values: any) => {
        addMaterialApi(values);
        form.resetFields();
        setModalAddMarterial(false);

    }
    const MaterialDelete = (id: any) => {
        materialDeleteApi(id.materialId);
    }
    const modalUpdateOff = () => {
        setModalUpdateMarterial(false);
    }
    const updateMaterial = (values: any) => {
        materialUpdateApi(values);
        form.resetFields();
        setModalUpdateMarterial(false);
    }
    const MaterialUpdate = (dataUpdate: any) => {
        form.setFieldsValue({
            materialId: dataUpdate.materialId,
            materialName: dataUpdate.materialName
        });
        setModalUpdateMarterial(true);
    }
    const materialSearch = marterial.filter(marterials => {
        const lowerCasedSearchTerm = searchMarterial.toLowerCase();
        return (
            String(marterials.materialId).toLowerCase().includes(lowerCasedSearchTerm) ||
            marterials.materialName.toLowerCase().includes(lowerCasedSearchTerm)
        );
    });

    return <>
        <h1>Marterial</h1>
        <Button type="primary" onClick={() => modalAdd()}>Material Add</Button>
        <Input
            placeholder="Search"
            onChange={(e) => setSearchMarterial(e.target.value)}
            style={{ marginBottom: '20px', width: '300px' }}

        />
        <div className="card">
            <DataTable value={materialSearch} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="materialId" header="Marterial id " style={{ width: '25%' }} ></Column>
                <Column field="materialName" header="material Name " style={{ width: '25%' }} ></Column>
                <Column header="Action" body={(rowData) => (
                    <>
                        <Button className="p-button-success" onClick={() => MaterialUpdate(rowData)}>update</Button>
                        <Button className="p-button-danger" onClick={() => MaterialDelete(rowData)}>delete</Button>
                    </>
                )} style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
        <div>
            <Modal
                title='Materials Add'
                visible={modalAddMarterial}
                onCancel={modalAddOff}
                footer={null}
            >
                <Form
                    form={form}
                    name="my_modal_form"
                    onFinish={addMaterial}
                    layout="vertical"
                >
                    <Form.Item
                        name="materialName"
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
            {/* material update  */}
            <Modal
                title='Materials Update'
                visible={modalUpdateMarterial}
                onCancel={modalUpdateOff}
                footer={null}
            >
                <Form
                    form={form}
                    name="my_modal_form"
                    onFinish={updateMaterial}
                    layout="vertical"
                >
                    <Form.Item
                        name="materialId"
                        label="Material Id"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="materialName"
                        label="Material Name"
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
export default Marterial;