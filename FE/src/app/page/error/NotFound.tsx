import React from "react";
import { Home } from "lucide-react";
import logo from "../../../assets/images/logo-dark.png";
import error404 from "../../../assets/images/error-404.png";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2>The page you are looking for doesn't exist.</h2>
          <a onClick={()=>{
            navigate('/dashboard')
          }} className="btn">
            <i className="bi bi-house me-1"></i>
            Back to home
          </a>
          <img
            src="assets/img/not-found.svg"
            className="img-fluid py-5"
            alt="Page Not Found"
          />
          {/* <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div> */}
        </section>
      </div>
    </main>
  );
}
