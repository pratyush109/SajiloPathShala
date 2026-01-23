import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignupSchema } from "../../schema/signup.schema";
import { useApi } from "../../hooks/useAPI";

import logo from "../../assets/logo.png";
import studyImg from "../../assets/study.jpg";
import "../../css/auth.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const handleSignup = async (userdata) => {
    setLoading(true);
    setError("");

    try {
      await callApi("POST", "/auth/register", { data: userdata });
      navigate("/login");
    } catch (e) {
      setError(e.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
  
      <div
        className="login-right"
        style={{ backgroundImage: `url(${studyImg})` }}
      />

      <div className="login-left">
        <div className="login-box">
          <div className="brand">
            <img src={logo} alt="logo" />
            <span>SajiloPathShala</span>
          </div>

          <h2>Create Account</h2>
          <p className="subtitle">
            Join SajiloPathShala and start your learning journey
          </p>

          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                {...register("fullName")}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <small className="error">{errors.fullName.message}</small>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <small className="error">{errors.email.message}</small>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
              />
              {errors.password && (
                <small className="error">{errors.password.message}</small>
              )}
            </div>

            <div className="form-group">
              <label>I am a</label>
              <select {...register("role")}>
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
              {errors.role && (
                <small className="error">{errors.role.message}</small>
              )}
            </div>

            {error && <p className="error text-center">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="switch">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;