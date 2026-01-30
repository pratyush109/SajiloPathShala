import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import {
  FaUserEdit,
  FaBook,
  FaPlus,
  FaMoneyBillWave,
  FaBriefcase,
  FaClock,
  FaSave,
  FaTimes,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { editTutorProfileSchema } from "../../schema/editTutorProfile.schema";
import { useApi } from "../../hooks/useAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const EditTutorProfile = () => {
  const { callApi } = useApi();
  const [subjectInput, setSubjectInput] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editTutorProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      location: "",
      bio: "",
      subjects: [],
      hourlyRate: 0,
      experience: 0,
      availability: {
        morning: true,
        afternoon: false,
        evening: true,
        weekend: true,
      },
    },
  });

  const subjects = watch("subjects") || [];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await callApi("GET", "/tutor/profile");
        reset(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProfile();
  }, [callApi, reset]);

  const addSubject = () => {
    const trimmed = subjectInput.trim();
    if (!trimmed || subjects.includes(trimmed)) return;
    setValue("subjects", [...subjects, trimmed]);
    setSubjectInput("");
  };

  const removeSubject = (index) => {
    setValue(
      "subjects",
      subjects.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await callApi("PUT", "/tutor/profile", { data });
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 py-5 bg-light d-flex justify-content-center">
      <form
        className="card shadow-sm p-4 w-100"
        style={{ maxWidth: "900px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-4 d-flex align-items-center gap-2">
          <FaUserEdit className="text-success" />
          Edit Tutor Profile
        </h2>

    
        <div className="row mb-3 g-3">
          <div className="col-md-4">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
              {...register("fullName")}
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName.message}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
              disabled
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label d-flex align-items-center gap-2">
              <FaMapMarkerAlt />
              Location
            </label>
            <input
              type="text"
              className={`form-control ${errors.location ? "is-invalid" : ""}`}
              placeholder="City, Country"
              {...register("location")}
            />
            {errors.location && (
              <div className="invalid-feedback">{errors.location.message}</div>
            )}
          </div>
        </div>

   
        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea
            className={`form-control ${errors.bio ? "is-invalid" : ""}`}
            rows="4"
            {...register("bio")}
          />
          {errors.bio && (
            <div className="invalid-feedback">{errors.bio.message}</div>
          )}
        </div>

        {/* Subjects */}
        <div className="mb-3">
          <label className="form-label">Subjects</label>

          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a subject"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSubject())
              }
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={addSubject}
            >
              <FaPlus />
            </button>
          </div>

          {subjects.map((sub, i) => (
            <span key={i} className="badge bg-success me-2 mb-2">
              {sub}
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                onClick={() => removeSubject(i)}
              />
            </span>
          ))}

          {errors.subjects && (
            <div className="text-danger small">{errors.subjects.message}</div>
          )}
        </div>

     
        <div className="row mb-3 g-3">
          <div className="col-md-6">
            <label className="form-label">Hourly Rate (NPR)</label>
            <input
              type="number"
              className={`form-control ${errors.hourlyRate ? "is-invalid" : ""}`}
              {...register("hourlyRate", { valueAsNumber: true })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Experience (Years)</label>
            <input
              type="number"
              className={`form-control ${errors.experience ? "is-invalid" : ""}`}
              {...register("experience", { valueAsNumber: true })}
            />
          </div>
        </div>

     
        <div className="mb-3">
          <label className="form-label">Availability</label>
          <div className="row g-2">
            {["morning", "afternoon", "evening", "weekend"].map((slot) => (
              <div className="col-6 col-md-3" key={slot}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register(`availability.${slot}`)}
                  />
                  <label className="form-check-label">
                    {slot.charAt(0).toUpperCase() + slot.slice(1)}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="d-flex gap-3 mt-4">
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            <FaSave /> {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => reset()}
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTutorProfile;
