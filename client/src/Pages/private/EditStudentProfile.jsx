import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { EditStudentProfileSchema } from "../../schema/editStudentProfile.schemas";
import "../../css/editStudentProfile.css";

const EditStudentProfile = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditStudentProfileSchema),
    defaultValues: {
      grade: "",
      bio: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Student Profile:", data);
    navigate("/studentdashboard");
  };

  return (
    <div className="edit-student-wrapper">
      <div className="edit-card">
        <h2>Edit Student Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* GRADE */}
          <div className="form-group">
            <label>Grade</label>
            <input
              {...register("grade")}
              placeholder="e.g., Grade 10"
            />
            {errors.grade && (
              <small className="error">{errors.grade.message}</small>
            )}
          </div>

    
          <div className="form-group">
            <label>Bio</label>
            <textarea
              {...register("bio")}
              placeholder="Tell us about yourself..."
            />
            {errors.bio && (
              <small className="error">{errors.bio.message}</small>
            )}
          </div>

        
          <div className="action-row">
            <button type="submit" className="save-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-btn"
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