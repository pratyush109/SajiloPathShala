import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const { callApi, loading } = useApi();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await callApi("POST", `/auth/reset-password/${token}`, { data: { password } });
      setMessage(res.data.message || "Password updated successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    }
  };

  return (
    <div className="reset-password-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: 380 }}>
        <h3 className="fw-bold text-center mb-3" style={{ color: "var(--primary)" }}>
          Set New Password
        </h3>
        
      {/* */}

        <form onSubmit={handleReset}>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-danger text-center">{error}</p>}
          {message && <p className="text-success text-center">{message}</p>}

          <button className="btn btn-primary w-100 mt-2" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;