import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import logo from "../../assets/logo.png";
import Footer from "../../components/Footer";
import { SignupSchema } from "../../schema/signup.schema";
import { useApi } from "../../hooks/useAPI";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const { callApi } = useApi();

  const handleSignup = async (userdata) => {
    setLoading(true);
    setApiError("");

    try {
      const res = await callApi("POST", "/auth/register", { data: userdata });
      console.log("Signup response:", res);
      navigate("/login");
    } catch (err) {
      setApiError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };


      return (
  <>
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* LEFT SIDE */}
        <div className="auth-left">
          <img src={logo} alt="Logo" className="auth-logo" />
          <h2>Create Account</h2>
          <p>Join SajiloPathShala and get started today</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          {apiError && <p className="error">{apiError}</p>}

          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="mb-3">
              <label>Full Name</label>
              <input
                {...register("fullName")}
                type="text"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <small className="error">{errors.fullName.message}</small>
              )}
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <small className="error">{errors.email.message}</small>
              )}
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <small className="error">{errors.password.message}</small>
              )}
            </div>

            <div className="mb-3">
              <label>Role</label>
              <select {...register("role")}>
                <option value="">Choose role</option>
                <option value="parent">Parent</option>
                <option value="tutor">Tutor</option>
                <option value="student">Student</option>
              </select>
              {errors.role && (
                <small className="error">{errors.role.message}</small>
              )}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="switch">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>

   
  </>
  );
};

export default Signup;
