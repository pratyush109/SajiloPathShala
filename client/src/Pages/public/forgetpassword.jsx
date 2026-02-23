import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetpassword } from "../../schema/forgetpassword.schema";
import { useApi } from "../../hooks/useApi";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/forget.css";

const ForgetPassword = () => {
  const { callApi, loading } = useApi();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgetpassword),
  });

  const handleForgetPassword = async (data) => {
    setMessage("");
    setError("");

    try {
      const res = await callApi("POST", "/auth/forgot-password", { data });
      setMessage(res.data.message || "Reset link sent! Check your email.");
    } catch (err) {
      setError(err.message || "Failed to send reset link");
    }
  };

  return (
    <div className="forget-password-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: 380 }}>
        <h3 className="fw-bold text-center mb-2" style={{ color: "var(--primary)" }}>
          Forgot Password
        </h3>
        <p className="text-muted text-center mb-4">Enter your email to receive reset link</p>

        <form onSubmit={handleSubmit(handleForgetPassword)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white"><FaEnvelope /></span>
              <input
                {...register("email")}
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}
          {message && <p className="text-success text-center">{message}</p>}

          <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <Link to="/login" className="text-decoration-none" style={{ color: "var(--primary)" }}>
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;