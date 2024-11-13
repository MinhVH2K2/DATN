import axiosClient from "./axiosClient";
const apiProduct = {
    getAllProDuctsByMutipleColums(categories, name, pageNo) {
        const response = axiosClient.get(`product/getAllProductByMutipleColums?pageNo=0&categories=${categories}`,{
            headers :{
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTczMTUxNDEzNywiaWF0IjoxNzMxNTEwNTM3LCJzY29wZSI6IlJPTEVfVVNFUiJ9.1sSX0EsBFCV-r733pfrDd9ukp_VACniVOWvxrhVOuacGb85RdeipOpl_ch_o9v-9xuzM-zfs4sR8Qn69ZLk8Yw`,
                'Content-Type': 'application/json'
            }
        })
        return response

    }

}
export default apiProduct;