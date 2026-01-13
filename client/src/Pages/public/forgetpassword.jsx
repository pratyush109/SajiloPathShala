import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetpassword } from "../../schema/forgetpassword.schema";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
const Forgetpassword = ()=>{
    const [message, setMessage] = useState("");
 


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgetpassword),
  });

  const handleforgetpassword = async (data) => {
    console.log(data);
     setMessage("A reset link has been sent to your email!");
  
  };
    return (
  <>
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* LEFT SIDE */}
        <div className="auth-left">
          <img src={logo} alt="Logo" className="auth-logo" />
          <h2>Forgot Password?</h2>
          <p>
            Enter your email and we’ll send you a reset link to get back into
            your account.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <form onSubmit={handleSubmit(handleforgetpassword)}>
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

            <button type="submit">Send Reset Link</button>

            {message && (
              <p className="text-success mt-3 text-center">{message}</p>
            )}

            <p className="switch">
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>

  </>
);

};
export default Forgetpassword;