import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import logo from "../../assets/logo.png";
import { forgetpassword } from "../../schema/forgetpassword.schema";
import { useApi } from "../../hooks/useAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import studyImg from "../../assets/study.png";


import { FaEnvelope } from "react-icons/fa";

const ForgetPassword = () => {
  const { callApi } = useApi();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetpassword),
  });

  const handleForgetPassword = async (data) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await callApi("POST", "/auth/forgot-password", { data });
      setMessage(res.data.message || "A reset link has been sent to your email!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="container-fluid vh-100">
    <div className="row h-100">

    
      <div className="col-lg-5 d-flex align-items-center justify-content-center">
        <div className="w-100 px-4" style={{ maxWidth: "420px" }}>
          
       
          <div className="d-flex align-items-center mb-3">
            <img src={logo} alt="logo" style={{ width: "70px", height: "70px" }} />
            <span className="fs-3 fw-bold ms-2">SajiloPathShala</span>
          </div>

          <h2 className="fw-bold">Reset Password</h2>
          <p className="text-muted mb-4">
            Enter your email and we’ll send you a reset link
          </p>

          <form onSubmit={handleSubmit(handleForgetPassword)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <FaEnvelope className="text-muted" />
                </span>
                <input
                  {...register("email")}
                  type="email"
                  className={`form-control border-start-0 ${errors.email ? "is-invalid" : ""}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
            </div>

            {error && <p className="text-danger text-center">{error}</p>}
            {message && <p className="text-success text-center">{message}</p>}

            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-3">
            <Link to="/login" className="text-success text-decoration-none">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>

 
      <div
        className="col-lg-7 d-none d-lg-block"
        style={{
          backgroundImage: `url(${studyImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

    </div>
  </div>
);

 
};

export default ForgetPassword;
