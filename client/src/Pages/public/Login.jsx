import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schema/login.schema";
import { useApi } from "../../hooks/useAPI";
import { useState } from "react";
import logo from "../../assets/logo.png";
import "../../css/auth.css";
import studyImg from "../../assets/study.jpg";
import { setToken, setRole } from "../../Utils/storage";

const LoginPage = () => {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (logindata) => {
  setLoading(true);
  setError("");

  try {
    const res = await callApi("POST", "/auth/login", {
      data: logindata,
    });

    const token = res?.data?.data?.access_token;
     const role = res?.data?.data?.role;
     const fullName = res?.data?.data?.fullName;
    const email = res?.data?.data?.email;

if (!token || !role) {
      throw new Error("Invalid login response");
    }

  setToken(token);
    setRole(role);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);


   if (role === "tutor") {
      navigate("/tutordashboard", { replace: true });
    } else {
      navigate("/studentdashboard", { replace: true });
    }
  } catch (e) {
    setError(e.message || "Login failed");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-box">
          <div className="brand">
            <img src={logo} alt="logo" />
            <span>SajiloPathShala</span>
          </div>

          <h2>Welcome Back</h2>
          <p className="subtitle">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit(handleLogin)}>
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
  <div className="forgot-link">
    <Link to="/forgetpassword">Forgot password?</Link>
  </div>
  {errors.password && (
    <small className="error">{errors.password.message}</small>
  )}
</div>


            {error && <p className="error text-center">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="switch">
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>

   <div
  className="login-right"
  style={{ backgroundImage: `url(${studyImg})` }}
/>
    </div>
  );
};

export default LoginPage;
