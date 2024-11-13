import React, { useEffect, useState } from "react";
import { LoginRequest } from "../../model/LoginModel";
import { AuthService } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    // DTO lấy giá trị ở input
    const [loginModel, setLoginModel] = useState<LoginRequest>(new LoginRequest('','',false));

    // Hàm để lấy giá trị ở input set vào DTO
    const handleInputChange = (e: any)=>{
        const value = e.target.value;
        const name = e.target.name;
        setLoginModel({
            ...loginModel,
            [name]: value
        })
    } 

    const handleRemember = ()=>{
        setLoginModel({
            ...loginModel,
            remember: !loginModel.remember
        })
    }

    const handleLogin = ()=>{
        console.log(loginModel);
        AuthService.getInstance().login(loginModel).then(res=>{
          localStorage.setItem('authToken', res.data.data.token);                     
            console.log(res);
            navigate('/counter-sale')
        }).catch(e=>{
            console.log(e);
        })
    }
    const navigate = useNavigate();

  

  return (
    <>
      <div className="container" style={{marginTop: '200px'}}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <a className="pointer logo d-flex justify-content-center align-items-center mb-2">
            <img src="assets/img/logo.png" alt="" />
            <span
              className="fw-bold d-none d-lg-block"
              style={{ color: "#EF8121" }}
            >
              Heaven
            </span>
            <span className="fw-bold d-none d-lg-block">Shop</span>
          </a>
          <div style={{width: '33%'}} className="card p-4">
            <div className="fs-3 fw-bold text-center">Login to Your Account</div>
            <div className="mb-3 text-center">Enter your username & password to login</div>

            <label>Username</label>
            <input value={loginModel.userName ?? ''} onChange={handleInputChange} name="userName" className="form-control mb-3" type="text" />

            <label>Password</label>
            <input value={loginModel.passWord ?? ''} onChange={handleInputChange} name="passWord" className="form-control mb-3" type="password" />

            <div className="mb-3">
              <input checked={loginModel.remember ?? false} onChange={handleRemember} className="me-2 form-check-input" type="checkbox" />
              Remember me
            </div>

            <button onClick={handleLogin} className="btn btn-primary mb-3">Login</button>

            <div className="col-12">
              <p className="small mb-0">
                Don't have account?{" "}
                <a>Create an account</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
