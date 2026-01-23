import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { editTutorProfileSchema } from "../../schema/editTutorProfile.schema";
import "../../css/editTutorProfile.css";

const EditTutorProfile = () => {
  const [subjectInput, setSubjectInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    
    resolver: zodResolver(editTutorProfileSchema),
    defaultValues: {
      bio: "I am expertise in math",
      subjects: ["Math"],
      hourlyRate: 2222,
      experience: 3,
      availability: {
        morning: true,
        afternoon: false,
        evening: true,
        weekend: true,
      },
    },
  });
   register("subjects");
  const subjects = watch("subjects") || [];


  const addSubject = () => {
    if (!subjectInput.trim()) return;
    setValue("subjects", [...subjects, subjectInput.trim()]);
    setSubjectInput("");
  };

  const removeSubject = (index) => {
    setValue(
      "subjects",
      subjects.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
  };

  return (
    <div className="edit-wrapper">
      <form className="edit-card" onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit Tutor Profile</h2>

      
        <label>Bio</label>
        <textarea {...register("bio")} />
        {errors.bio && <p className="error">{errors.bio.message}</p>}

      
        <label>Subjects</label>
        <div className="subject-input">
          <input
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
            placeholder="Add a subject you teach"
          />
          <button type="button" onClick={addSubject}>
            Add
          </button>
        </div>

        <div className="subject-list">
          {subjects.map((sub, i) => (
            <span key={i} className="subject-chip">
              {sub}
              <button type="button" onClick={() => removeSubject(i)}>
                ×
              </button>
            </span>
          ))}
        </div>
        {errors.subjects && (
          <p className="error">{errors.subjects.message}</p>
        )}

        <div className="two-grid">
          <div>
            <label>Hourly Rate (NPR)</label>
            <input
              type="number"
              {...register("hourlyRate", { valueAsNumber: true })}
            />
            {errors.hourlyRate && (
              <p className="error">{errors.hourlyRate.message}</p>
            )}
          </div>

          <div>
            <label>Years of Experience</label>
            <input
              type="number"
              {...register("experience", { valueAsNumber: true })}
            />
            {errors.experience && (
              <p className="error">{errors.experience.message}</p>
            )}
          </div>
        </div>

      
        <label>Availability</label>
        <div className="availability-grid">
          <label>
            <input type="checkbox" {...register("availability.morning")} />
            Morning
          </label>
          <label>
            <input type="checkbox" {...register("availability.afternoon")} />
            Afternoon
          </label>
          <label>
            <input type="checkbox" {...register("availability.evening")} />
            Evening
          </label>
          <label>
            <input type="checkbox" {...register("availability.weekend")} />
            Weekend
          </label>
        </div>

        {errors.availability && (
          <p className="error">{errors.availability.message}</p>
        )}

       
        <div className="action-row">
          <button className="save">Save Changes</button>
          <button type="button" className="cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTutorProfile;