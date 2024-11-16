
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';
import { AnyListenerPredicate } from '@reduxjs/toolkit';
const Color = () => {
    const [color, setColor] = useState([]);
    const [mamau, setMaMau] = useState('#ffffff');
    const [isModalAdd, setIsModalAdd] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [form] = Form.useForm();


    // interface ColorItem {
    //     colerId: number;        // Hoặc kiểu dữ liệu tương ứng
    //     corlorName: string;     // Tên màu
    //     colorCode: string;      // Mã màu
    // }
    const geitAllColo = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const repon = await axios.get(`http://localhost:8081/colors/getAll-corler`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setColor(repon.data);
            console.log(repon.data);
        } catch (er) {

        }
    }
    const addColor = async (colorCode: String, colorName: String) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:8081/colors/add-corler', {
                colorCode: colorCode,
                corlorName: colorName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Cập nhật danh sách màu sắc mới
        } catch (error) {
            console.error('Error adding color:', error);
            // Có thể thêm thông báo thông báo cho người dùng ở đây
        }
    };
    const ColorDelete = async (id: any) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.delete(`http://localhost:8081/colors/delete-corler/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            geitAllColo();
        } catch (error) {
            console.log("delete color : " + error);
        }
    }
    const ColorUpdate = async (values: any) => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.put('http://localhost:8081/colors/update-corler', values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            geitAllColo();

        } catch (e) {
            console.error("error update :" + e);
        }
    }

    const chonMaMau = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaMau(event.target.value); // Cập nhật màu khi người dùng chọn
    };
    const colorBodyTemplate = (rowData: any) => {
        return (
            <div style={{
                width: '50px',
                height: '20px',
                backgroundColor: rowData.colorCode,
                border: '1px solid #000'
            }}>
            </div>
        );
    };
    useEffect(() => {
        geitAllColo()
        // CustomerService.getCustomersMedium().then((data) => setCustomers(data));
    }, []);

    const isModalAddOpen = () => {
        form.resetFields();
        // setMaMau('#ffffff');
        setIsModalAdd(true);
    }
    const isModalAddOff = () => {
        setIsModalAdd(false);
    }
    const isModalUpdateOpen = () => {
        setIsModalUpdate(true);
    }
    const isModalUpdateOff = () => {
        setIsModalUpdate(false);
    }
    // const AddColorModal = () => {

    // }
    const AddColorModal = async (values: any) => {
        console.log('Adding color with:', mamau, values.corlorName);
        await addColor(mamau, values.corlorName);
        geitAllColo();
        isModalAddOff();
    };
    const DeleteColorIsId = (value: any) => {
        ColorDelete(value.colerId);
    }
    const DetailColorUpdate = (dataColorUpdate: any) => {
        console.log('Updating color with data:', dataColorUpdate);
        form.setFieldsValue({
            colerId: dataColorUpdate.colerId,
            corlorName: dataColorUpdate.corlorName,
            colorCode: dataColorUpdate.colorCode
        });
        setMaMau(dataColorUpdate.colorCode); // Update the color input as well
        isModalUpdateOpen();
    }

    const UpdateColorModal = async (values: any) => {
        ColorUpdate(values);

        isModalUpdateOff();
    }


    return <>
        <h1>Color</h1>

        <Button type="primary" onClick={isModalAddOpen}>Color Add</Button>
        <div className="card">
            <DataTable value={color} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="colerId" header="colerId" style={{ width: '25%' }} ></Column>
                <Column field="corlorName" header="corlorName" style={{ width: '25%' }} ></Column>
                <Column field="colorCode" header="colorCode" body={colorBodyTemplate} style={{ width: '25%' }}></Column>
                <Column header="Action" body={(rowData) => (
                    <>
                        <Button className="p-button-success" onClick={() => DetailColorUpdate(rowData)}>update</Button>
                        <Button className="p-button-danger" onClick={() => DeleteColorIsId(rowData)}>delete</Button>
                    </>
                )} style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
        <div>
            <Modal
                title='Color Add'
                visible={isModalAdd}
                onCancel={isModalAddOff}
                footer={null}
            >
                <Form
                    form={form}
                    name="my_modal_form"
                    onFinish={AddColorModal}
                    layout="vertical"
                >
                    <Form.Item
                        name="colorCode"
                        label="Color Code"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input type='color'
                            value={mamau}
                            style={{
                                width: '100px'
                            }}
                            onChange={chonMaMau} />
                    </Form.Item>
                    <Form.Item
                        name="corlorName"
                        label="Color Name"
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
            {/* modal update CLOLOR */}
            <Modal
                title='Color Update'
                visible={isModalUpdate}
                onCancel={isModalUpdateOff}
                footer={null}
            >
                <Form
                    form={form}
                    name="my_modal_form"
                    onFinish={UpdateColorModal}
                    layout="vertical"
                >
                    <Form.Item
                        name="colerId"
                        label="Color id"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="colorCode"
                        label="Color Code"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input type='color'
                            value={mamau}
                            style={{
                                width: '100px'
                            }}
                            onChange={chonMaMau} />
                    </Form.Item>
                    <Form.Item
                        name="corlorName"
                        label="Color Name"
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
export default Color;