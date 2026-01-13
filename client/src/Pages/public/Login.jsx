import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schema/login.schema";
import { useApi } from "../../hooks/useAPI";
import logo from "../../assets/logo.png";
import Footer from "../../components/Footer";
import "../../css/auth.css";

const LoginPage = () => {
  const navigate = useNavigate(); 
  const { callApi } = useApi();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(LoginSchema),
  });
const handleLogin = async (logindata) => {
  try {
    const res = await callApi("POST", "/auth/login", { data: logindata });

   
    const token = res?.data?.data?.access_token;
    

    localStorage.setItem("access_token", token);

    navigate("/browser", { replace: true });
  } catch (e) {
    console.log(e.message);
    alert(e.message);
  }
};


  return (
    <>
      <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <img src={logo} alt="Logo" className="auth-logo" />
          <h2>Welcome Back</h2>
          <p>Please login to continue</p>
        </div>

        <div className="auth-right">
          <form onSubmit={handleSubmit(handleLogin)}>
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

            <div className="forgot">
              <Link to="/forgetpassword">Forgot password?</Link>
            </div>

            <button type="submit">Login</button>

            <p className="switch">
              Don’t have an account? <Link to="/signup">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>

 


    </>
  );
};

export default LoginPage;
