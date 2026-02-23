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
  }, []);

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

    // Notify BrowseTutors to refresh subjects
    window.dispatchEvent(new Event("subjectsUpdated"));
  } catch {
    alert("Failed to update profile");
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
      {/* Header */}
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
            <div className="col-md-4">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-control input-modern ${errors.fullName ? "is-invalid" : ""}`}
                {...register("fullName")}
              />
              <div className="invalid-feedback">{errors.fullName?.message}</div>
            </div>

            <div className="col-md-4">
              <label className="form-label">Email</label>
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
        </div>

        {/* SUBJECTS */}
        <div className="mb-4">
          <div className="section-title">Subjects You Teach</div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control input-modern"
              placeholder="Add subject"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
            />
            <button type="button" className="btn brand-btn" onClick={addSubject}>
              <FaPlus />
            </button>
          </div>

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

        {/* PROFESSIONAL DETAILS */}
        <div className="mb-4">
         
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Hourly Rate (NPR)</label>
              <input
                type="number"
                className="form-control input-modern"
                {...register("hourlyRate", { valueAsNumber: true })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Experience (Years)</label>
              <input
                type="number"
                className="form-control input-modern"
                {...register("experience", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

    {/* AVAILABILITY */}
<div className="mb-4">
  <div className="section-title">Availability</div>

  <div className="row g-3">
    {["morning", "afternoon", "evening", "weekend"].map((slot) => (
      <div className="col-6 col-md-3" key={slot}>
        <label className="availability-card w-100">
          <input
            type="checkbox"
            {...register(`availability.${slot}`)}
          />
          <span className="checkmark"></span>
          <span className="slot-text text-capitalize">{slot}</span>
        </label>
      </div>
    ))}
  </div>
</div>


        {/* BUTTONS */}
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