import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ToggleButton } from 'primereact/togglebutton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Modal, Button, Form } from 'react-bootstrap';
import { Modal, Form, Input, Button } from 'antd';
import ReactPaginate from 'react-paginate';
import { LocateOffIcon } from 'lucide-react';






export default function Categoris() {
   const navigate = useNavigate();
   const [categori, setCategori] = useState<categiris[]>([]);
   const [categorisUpdate, setCategorisUpdate] = useState([]);
   const [categorisDelete, setCategorisDelete] = useState([]);
   const [isModalOpen, setModalOpen] = useState(false);
   const [isModalOpens, setModalOpens] = useState(false);
   const [searchCategori, setSearchCategori] = useState('');
   const [form] = Form.useForm(); // Khởi tạo form
   // phân trang 
   const [totalPage, setTotalPage] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);


   interface categiris {
      categoriesId: String,
      categoriesName: String
   }

   useEffect(() => {
      getAllCategoris(currentPage)

   }, []);

   const getAllCategoris = async (page: number) => {
      const token = localStorage.getItem('authToken');
      try {
         const response = await axios.get(`http://localhost:8081/categori/getAll-categori?p=${page}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         console.log('API Response:', response.data);
         setCategori(response.data); // The paginated items
         setTotalPage(response.headers['X-Total-Pages']); // Total pages
         setCurrentPage(page); // Update current page
      } catch (error) {
         console.error('There was an error fetching the categories!', error);
      }
   }
   interface PaginationData {
      selected: number;
   }
   const handlePageClick = (data: PaginationData) => {
      // `data.selected` is the new page index
      const selectedPage = data.selected + 1; // ReactPaginate uses zero-indexing
      getAllCategoris(selectedPage); // Fetch categories for the selected page
   }




   // Hàm để mở modal
   const showModal = () => {
      setModalOpen(true);
   };

   // Hàm để đóng modal
   const handleCancel = () => {
      setModalOpen(false);
   };


   const showModals = () => {
      setModalOpens(true);
   };

   // Hàm để đóng modal
   const handleCancels = () => {
      setModalOpens(false);
   };
   // Hàm xử lý khi form được submit
   const onFinish = async (values: any) => {
      const token = localStorage.getItem('authToken');
      try {
         const response = await axios.post('http://localhost:8081/categori/add-categori', values, {
            headers: {
               Authorization: `Bearer ${token}` // Thêm token vào headers
            }
         });
         console.log('Response:', response.data);
         // Reset form sau khi submit thành công
         form.resetFields();
         // Đóng modal
         handleCancel();

      } catch (error) {
         console.error('Error:', error);
      }
   };

   const updateCategoris = async (values: any) => {
      const token = localStorage.getItem('authToken');
      try {
         await axios.put('http://localhost:8081/categori/update-category', values, {
            headers: {
               Authorization: `Bearer ${token}`
            }

         });
         getAllCategoris(currentPage);
         handleCancels();

      } catch (e) {
         console.error("error update :" + e);
      }
   }
   const categoriUpdate = (datacategori: any) => {
      console.log(datacategori)
      // setCategorisUpdate(datacategori);
      form.setFieldsValue({
         categoriesId: datacategori.categoriesId,
         categoriesName: datacategori.categoriesName,
      })
      setModalOpens(true);

   }

   const deleteCategory = async (id: any) => {
      const token = localStorage.getItem('authToken');
      try {
         const response = await axios.delete(`http://localhost:8081/categori/delete-categori/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         console.log(response.data); // "thành công" hoặc "thất bại"
         getAllCategoris(currentPage); // Tải lại danh sách sau khi xóa thành công
      } catch (e) {
         console.error("Error deleting category:", e);
      }
   };

   const categoriDelete = (categoriid: any) => {
      console.log(categoriid);
      deleteCategory(categoriid.categoriesId);
   }

   const categoriSearch = categori.filter(categoris => {
      const lowerCasedSearchTerm = searchCategori.toLowerCase();
      return (
         String(categoris.categoriesId).toLowerCase().includes(lowerCasedSearchTerm) ||
         categoris.categoriesName.toLowerCase().includes(lowerCasedSearchTerm)
      );
   });


   return (
      <>
         <div>
            <h2>Categori</h2>
            <nav aria-label="breadcrumb">
               <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="#" className="text-inherit">Dashboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Categori</li>
               </ol>
            </nav>
         </div>
         <div>
            <Button type="primary" onClick={showModal}>
               Categori Add
            </Button>
         </div>
         <Input
            placeholder="Search"
            onChange={(e) => setSearchCategori(e.target.value)}
            style={{ marginBottom: '20px', width: '300px' }}

         />
         <div className="card">
            <DataTable value={categoriSearch} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
               <Column field="categoriesId" header="colerId" style={{ width: '25%' }} ></Column>
               <Column field="categoriesName" header="corlorName" style={{ width: '25%' }} ></Column>
               <Column header="Action" body={(rowData) => (
                  <>
                     <Button className="p-button-success" onClick={() => categoriUpdate(rowData)}>update</Button>
                     <Button className="p-button-danger" onClick={() => categoriDelete(rowData)}>delete</Button>
                  </>
               )} style={{ width: '25%' }}></Column>
            </DataTable>
         </div>
         {/* ============================================ */}

         <Modal
            title="My Form"
            visible={isModalOpen}
            onCancel={handleCancel}
            footer={null} // Không dùng footer mặc định
         >
            <Form
               form={form}
               name="my_modal_form"
               onFinish={onFinish}
               layout="vertical"
            >
               <Form.Item
                  name="categoriesName"
                  label="Name"
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


         {/* //sdasdasdasdasd */}
         <Modal
            title="categori update "
            visible={isModalOpens}
            onCancel={handleCancels}
            footer={null} // Không dùng footer mặc định
         >
            <Form
               form={form}
               name="my_modal_form"
               onFinish={updateCategoris}
               layout="vertical"
            >
               <Form.Item
                  name="categoriesId"
                  label="id"
                  rules={[{ required: true, message: 'Please input your name!' }]}
               >
                  <Input disabled />
               </Form.Item>
               <Form.Item
                  name="categoriesName"
                  label="Name"
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
      </>
   )
}
