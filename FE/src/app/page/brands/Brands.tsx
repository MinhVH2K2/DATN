import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';



const Brands = () => {

    const [brands, setBrands] = useState<brand[]>([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [file, setFile] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [searchBrand, setSearchBrand] = useState('')
    const [form] = Form.useForm();

    interface brand {
        brandId: Number,
        brandName: String
    }

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

    const addModalOn = () => {
        setModalAdd(true);
    }
    const addModaloff = () => {
        form.resetFields();
        setFile(null); // Reset file state
        setFileName(""); // Reset file name
        setModalAdd(false);
    }
    const addBrands = async (brandName: string, brandLogoBase64: string | null) => {
        const token = localStorage.getItem('authToken');

        if (!brandLogoBase64) return; // Kiểm tra nếu không có tệp

        try {
            await axios.post('http://localhost:8081/Brands/add-brands', {
                brandName: brandName,
                brandLogo: brandLogoBase64 // Gửi chuỗi Base64
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            geitAllBrands();
            addModaloff();
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]; // Sử dụng optional chaining
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFile(base64String);
                console.log(base64String); // In ra chuỗi Base64 để kiểm tra
            };
            reader.readAsDataURL(selectedFile); // Đọc tệp như một URL Data
            setFileName(selectedFile.name); // Lưu tên tệp
        }
    };

    const AddBrandsForm = async (values: any) => {
        await addBrands(values.brandName, file); // file là `string | null`
    }


    const brandsSearch = brands.filter(brand => {
        const lowerCasedSearchTerm = searchBrand.toLowerCase();
        return (
            String(brand.brandId).toLowerCase().includes(lowerCasedSearchTerm) ||
            brand.brandName.toLowerCase().includes(lowerCasedSearchTerm)
        );
    });

    return <>
        <h1>Brands</h1>
        <Button type="primary" onClick={() => addModalOn()} >Material Add</Button>
        <Input
            placeholder="Search"
            onChange={(e) => setSearchBrand(e.target.value)}
            style={{ marginBottom: '20px', width: '300px' }}

        />
        <div className="card">
            <DataTable value={brandsSearch} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="brandId" header="Brands id " style={{ width: '25%' }} ></Column>
                <Column field="brandName" header="Brands Name " style={{ width: '25%' }} ></Column>
                <Column field="brandLogo" header="Brands Logo" style={{ width: '25%' }}
                    body={(rowData) => (
                        <img
                            src={rowData.brandLogo}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                    )}
                ></Column>
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
                title='Add Brand'
                visible={modalAdd}
                onCancel={addModaloff}
                footer={null}
            >
                <Form
                    form={form}
                    name="my_modal_form"
                    onFinish={AddBrandsForm}
                    layout="vertical"
                >
                    <Form.Item
                        name="brandName"
                        label="Color Name"
                        rules={[{ required: true, message: 'Please input your color name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Chọn Hình Ảnh">
                        <Input type="file" name='brandLogo' accept="image/*" onChange={handleFileChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    </>
}
export default Brands;