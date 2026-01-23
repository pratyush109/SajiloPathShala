import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import logo from "../../assets/logo.png";
import { forgetpassword } from "../../schema/forgetpassword.schema";
import "../../css/auth.css";

const ForgetPassword = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetpassword),
  });

  const handleForgetPassword = async (data) => {
    console.log(data);
    setMessage("A reset link has been sent to your email!");
  };

  return (
    <div className="fp-page">
      <div className="fp-card">
      
        <div className="fp-brand">
          <img src={logo} alt="SajiloPathShala" />
          <span>SajiloPathShala</span>
        </div>


        <h2>Reset Password</h2>
        <p className="subtitle">
          Enter your email address and we'll send you a password reset link
        </p>

        <form onSubmit={handleSubmit(handleForgetPassword)}>
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

          <button type="submit">Send Reset Link</button>

          {message && (
            <p className="success text-center">{message}</p>
          )}
        </form>

        <div className="back-link">
          <Link to="/login">← Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;