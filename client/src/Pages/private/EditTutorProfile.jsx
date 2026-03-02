import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import {
  FaUserEdit,
  FaPlus,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { editTutorProfileSchema } from "../../schema/editTutorProfile.schema";
import { useApi } from "../../hooks/useAPI";
import "../../style/EditTutorProfile.css";

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
      bio: "",
      subjects: [],
      hourlyRate: 100,
      experience: 0,
      availability: {
        morning: false,
        afternoon: false,
        evening: false,
        weekend: false,
      },
    },
  });

  const subjects = watch("subjects") || [];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await callApi("GET", "/tutor/profile");
        
        
        const flattenedData = {
          ...res.data,
          fullName: res.data.fullName || res.data.User?.fullName || "",
          email: res.data.email || res.data.User?.email || "",
         
          hourlyRate: Number(res.data.hourlyRate) || 100,
          experience: Number(res.data.experience) || 0,
        };
        
        reset(flattenedData);
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };
    fetchProfile();
  }, [reset]);

  const addSubject = () => {
    const trimmed = subjectInput.trim();
    if (!trimmed || subjects.includes(trimmed)) return;
    setValue("subjects", [...subjects, trimmed], { shouldValidate: true });
    setSubjectInput("");
  };

  const removeSubject = (index) => {
    setValue("subjects", subjects.filter((_, i) => i !== index), { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
     
      await callApi("PUT", "/tutor/profile", { data });
      alert("Profile updated successfully!");
      window.dispatchEvent(new Event("subjectsUpdated"));
    } catch (err) {
      console.error("Submit Error:", err);
     
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-start py-5">
      <form
        className="card shadow profile-card w-100"
        style={{ maxWidth: "950px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="card-header-brand d-flex align-items-center gap-3">
          <FaUserEdit size={22} />
          <div>
            <h4 className="mb-0">Edit Tutor Profile</h4>
            <small>Update your professional details</small>
          </div>
        </div>

        <div className="p-4">
          {/* BASIC INFO */}
          <div className="mb-4">
            <div className="section-title">Basic Information</div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control input-modern ${errors.fullName ? "is-invalid" : ""}`}
                  {...register("fullName")}
                />
                <div className="invalid-feedback">{errors.fullName?.message}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Email (Managed by Account)</label>
                <input
                  type="email"
                  disabled
                  className="form-control input-modern bg-light"
                  {...register("email")}
                />
              </div>
            </div>
          </div>

          {/* BIO */}
          <div className="mb-4">
            <div className="section-title">About You</div>
            <textarea
              className={`form-control input-modern ${errors.bio ? "is-invalid" : ""}`}
              rows="4"
              {...register("bio")}
            />
            <div className="invalid-feedback">{errors.bio?.message}</div>
          </div>

          {/* SUBJECTS */}
          <div className="mb-4">
            <div className="section-title">Subjects You Teach</div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control input-modern"
                placeholder="e.g. Mathematics"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
              />
              <button type="button" className="btn brand-btn" onClick={addSubject}>
                <FaPlus />
              </button>
            </div>
            {errors.subjects && <div className="text-danger small mb-2">{errors.subjects.message}</div>}
            {subjects.map((sub, i) => (
              <span key={i} className="badge badge-subject me-2 mb-2">
                {sub}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  onClick={() => removeSubject(i)}
                />
              </span>
            ))}
          </div>

         
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Hourly Rate (NPR)</label>
              <input
                type="number"
                className={`form-control input-modern ${errors.hourlyRate ? "is-invalid" : ""}`}
                {...register("hourlyRate", { valueAsNumber: true })}
              />
              <div className="invalid-feedback">{errors.hourlyRate?.message}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Experience (Years)</label>
              <input
                type="number"
                className={`form-control input-modern ${errors.experience ? "is-invalid" : ""}`}
                {...register("experience", { valueAsNumber: true })}
              />
              <div className="invalid-feedback">{errors.experience?.message}</div>
            </div>
          </div>

     
          <div className="mb-4">
            <div className="section-title">Availability</div>
            <div className="row g-3">
              {["morning", "afternoon", "evening", "weekend"].map((slot) => (
                <div className="col-6 col-md-3" key={slot}>
                  <label className="availability-card w-100">
                    <input type="checkbox" {...register(`availability.${slot}`)} />
                    <span className="checkmark"></span>
                    <span className="slot-text text-capitalize">{slot}</span>
                  </label>
                </div>
              ))}
            </div>
            {errors.availability && <div className="text-danger small mt-2">{errors.availability.message}</div>}
          </div>


          <div className="d-flex justify-content-end gap-3 mt-4">
            <button type="button" className="btn btn-light" onClick={() => reset()}>
              <FaTimes /> Cancel
            </button>
            <button type="submit" className="btn brand-btn text-white" disabled={loading}>
              <FaSave /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTutorProfile;

      {/* */}