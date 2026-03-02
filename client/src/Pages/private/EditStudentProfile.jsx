import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { EditStudentProfileSchema } from "../../schema/editStudentProfile.schemas";
import { useApi } from "../../hooks/useAPI";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/EditStudentProfile.css";

const EditStudentProfile = () => {
  const navigate = useNavigate();
  const { callApi } = useApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditStudentProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });


  useEffect(() => {
    reset({
      fullName: localStorage.getItem("fullName") || "",
      email: localStorage.getItem("email") || "",
    });
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("id");

      if (!userId) {
        alert("User ID missing! Please login again.");
        navigate("/login");
        return;
      }

      
      await callApi("PUT", `/auth/users/${userId}`, { data });

      localStorage.setItem("fullName", data.fullName);

      alert("Profile updated successfully!");
      navigate("/studentdashboard");
    } catch (err) {
      console.log(err.response || err.message);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-start py-5 app-bg">
      <div className="card brand-card p-4" style={{ maxWidth: "720px", width: "100%" }}>
        
        <div className="mb-4 text-center">
          <h2 className="brand-heading">Edit Student Profile</h2>
          <p className="text-muted mb-0">Keep your academic profile up to date</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
              {...register("fullName")}
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName.message}</div>
            )}
          </div>

      
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control bg-light"
              {...register("email")}
              disabled
            />
          </div>

          <div className="d-flex gap-3 mt-4">
            <button type="submit" className="btn btn-brand flex-fill">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary flex-fill"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentProfile;

      {/* */}