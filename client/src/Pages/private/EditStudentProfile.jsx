import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { EditStudentProfileSchema } from "../../schema/editStudentProfile.schemas";
import { useApi } from "../../hooks/useAPI";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
      grade: "",
      bio: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await callApi("GET", "/student/profile");
        reset(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProfile();
  }, [callApi, reset]);

  const onSubmit = async (data) => {
    try {
      await callApi("PUT", "/student/profile", { data });
      alert("Profile updated successfully!");
      navigate("/studentdashboard");
    } catch (err) {
      console.log(err.message);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-start py-5 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: "720px", width: "100%" }}>
        <h2 className="mb-4">Edit Student Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your full name"
              {...register("fullName")}
              disabled
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Your email address"
              {...register("email")}
              disabled
            />
          </div>

          {/* Grade */}
          <div className="mb-3">
            <label className="form-label">Grade</label>
            <input
              type="text"
              className={`form-control ${errors.grade ? "is-invalid" : ""}`}
              placeholder="e.g., Grade 10"
              {...register("grade")}
            />
            {errors.grade && (
              <div className="invalid-feedback">{errors.grade.message}</div>
            )}
          </div>

          {/* Bio */}
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea
              className={`form-control ${errors.bio ? "is-invalid" : ""}`}
              placeholder="Tell us about yourself..."
              rows="5"
              {...register("bio")}
            />
            {errors.bio && (
              <div className="invalid-feedback">{errors.bio.message}</div>
            )}
          </div>

          <div className="d-flex gap-3 mt-4">
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
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
