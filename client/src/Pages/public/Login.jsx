import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schema/login.schema";
import { useApi } from "../../hooks/useAPI";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { setToken, setRole } from "../../Utils/storage";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.css";
import loginArt from "../../assets/study.png";

import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (logindata) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await callApi("POST", "/auth/login", { data: logindata });
      const token = res?.data?.data?.access_token;
      const role = res?.data?.data?.role;
      const fullName = res?.data?.data?.fullName || ""; 
      const email = res?.data?.data?.email || "";
      if (!token || !role) throw new Error("Invalid login response");

      setToken(token);
      setRole(role);
localStorage.setItem("fullName", fullName); 
localStorage.setItem("email", email);
      toast.success("Login successful 🎉");

      setTimeout(() => {
        if (role === "tutor") navigate("/tutordashboard", { replace: true });
        else if (role === "student") navigate("/studentdashboard", { replace: true });
        else if (role === "admin") navigate("/admindashboard", { replace: true });

      }, 800);
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="row g-0 h-100">

      
        <div className="col-lg-5 d-flex align-items-center justify-content-center bg-white">
          <div className="login-box w-100 px-4">

            <div className="mb-4 text-center text-lg-start">
              <img src={logo} alt="logo" className="login-logo mb-3" />
              <h2 className="fw-bold">Welcome back !</h2>
              <p className="text-muted small">
                Enter to get unlimited access to data & information.
              </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)}>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Email *</label>
                <div className="input-group login-input">
                  <span className="input-group-text"><FaEnvelope /></span>
                  <input
                    {...register("email")}
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your mail address"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Password *</label>
                <div className="input-group login-input">
                  <span className="input-group-text"><FaLock /></span>
                  <input
                    {...register("password")}
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter password"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3 small">
                <div>
                  <input type="checkbox" className="form-check-input me-2" />
                  Remember me
                </div>
                <Link to="/forgetpassword" className="brand-link">Forgot password?</Link>
              </div>

              <button type="submit" className="btn btn-brand w-100 py-2" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>

              <div className="text-center mt-4 small">
                Don’t have an account? <Link to="/signup" className="brand-link fw-semibold">Register here</Link>
              </div>

            </form>
          </div>
        </div>

   
       <div
  className="col-lg-7 d-none d-lg-block login-art"
  style={{ backgroundImage: `url(${loginArt})` }}
></div>

        

      </div>
    </div>
  );
};

export default LoginPage;
