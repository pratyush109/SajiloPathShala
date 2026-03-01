import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast"; // 1. Added toast

import { SignupSchema } from "../../schema/signup.schema";
import { useApi } from "../../hooks/useAPI";

import studyImg from "../../assets/tutor.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.css";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const handleSignup = async (userdata) => {
    setLoading(true);

    const data = {
      ...userdata,
      fullName: userdata.fullName.trim(),
      email: userdata.email.trim(),
    };

    // 2. Using toast.promise to handle Loading -> Success/Error in one go
    toast.promise(
      callApi("POST", "/auth/register", { data }),
      {
        loading: "Creating your account...",
        success: () => {
          setTimeout(() => navigate("/login"), 1500); // Navigate after a short delay
          return "Signup successful! Please log in. 🎉";
        },
        error: (err) => err.response?.data?.message || err.message || "Signup failed",
      }
    ).finally(() => setLoading(false));
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div
          className="col-lg-6 d-none d-lg-block auth-image"
          style={{ 
            backgroundImage: `url(${studyImg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        />

        <div className="col-lg-6 d-flex align-items-center justify-content-center bg-white">
          <div className="auth-form p-4" style={{ maxWidth: "450px", width: "100%" }}>
            <h2 className="fw-bold">Create Account</h2>
            <p className="text-muted mb-4">
              Join SajiloPathShala and start your learning journey
            </p>

            <form onSubmit={handleSubmit(handleSignup)}>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FaUser className="text-muted" />
                  </span>
                  <input
                    {...register("fullName")}
                    className={`form-control border-start-0 ${errors.fullName ? "is-invalid" : ""}`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small">Email</label>
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
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FaLock className="text-muted" />
                  </span>
                  <input
                    {...register("password")}
                    type="password"
                    className={`form-control border-start-0 ${errors.password ? "is-invalid" : ""}`}
                    placeholder="••••••••"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small">I am a</label>
                <select
                  {...register("role")}
                  className={`form-select ${errors.role ? "is-invalid" : ""}`}
                >
                  <option value="">Select role</option>
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                </select>
                {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
              </div>

              <button 
                type="submit" 
                className="btn btn-success w-100 py-2 fw-bold" 
                disabled={loading}
                style={{ backgroundColor: "#198754", border: "none" }}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <p className="text-center mt-3 small">
                Already have an account?{" "}
                <Link to="/login" className="text-success fw-bold text-decoration-none">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;