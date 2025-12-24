import React, { useEffect, useState } from "react";
import HOD_API from "../../../apis/HOD";
import { useAuth } from "../../../contexts/AuthContext";

const CourseForm = ({ open, onClose, onSaved, initialData = null }) => {
  const { user } = useAuth();

  const [programmes, setProgrammes] = useState([]);
  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    credits: "",
    category: "",
    version: "1.0",
    programmeId: "",
  });

  // Load programmes + set form if editing
  useEffect(() => {
    if (open) {
      loadProgrammes();

      if (initialData) {
        setForm({
          code: initialData.code,
          name: initialData.name,
          description: initialData.description || "",
          credits: String(initialData.credits),
          category: initialData.category,
          version: initialData.version,
          programmeId: initialData.programmeId,
        });
      } else {
        setForm({
          code: "",
          name: "",
          description: "",
          credits: "",
          category: "",
          version: "1.0",
          programmeId: "",
        });
      }
    }
  }, [open]);

  const loadProgrammes = async () => {
    try {
      const res = await HOD_API.programmes.getAll();
      setProgrammes(res.data || []);

      // Auto-select first programme if creating new
      if (!initialData && res.data.length > 0) {
        setForm((f) => ({ ...f, programmeId: res.data[0].id }));
      }
    } catch (err) {
      console.error("Programme load error:", err);
    }
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.code.trim()) return "Course code required";
    if (!form.name.trim()) return "Course name required";
    if (!form.credits || isNaN(form.credits)) return "Credits must be numeric";
    if (!form.category.trim()) return "Category required";
    if (!form.programmeId) return "Programme selection required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return alert(error);

    const payload = {
      code: form.code,
      name: form.name,
      description: form.description,
      credits: Number(form.credits),
      category: form.category,
      version: form.version,
      programmeId: form.programmeId,
    };

    try {
      let createdCourse;

      if (initialData) {
        // Update existing
        await HOD_API.courses.updateCourse(initialData.id, payload);
        createdCourse = { id: initialData.id };
      } else {
        // Create new course
        const res = await HOD_API.courses.createCourse(payload);
        createdCourse = res.data;
      }

      onSaved(createdCourse.id); // pass courseId → goes to CLO Count
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || "Error saving course");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-3">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Course" : "Add Course"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Course Code"
            className="border p-2 w-full"
            value={form.code}
            onChange={(e) => handleChange("code", e.target.value)}
            disabled={!!initialData}
          />

          <input
            type="text"
            placeholder="Course Name"
            className="border p-2 w-full"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="border p-2 w-full"
            rows={3}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <input
            type="number"
            placeholder="Credits"
            className="border p-2 w-full"
            value={form.credits}
            onChange={(e) => handleChange("credits", e.target.value)}
          />

          <input
            type="text"
            placeholder="Category (Core/Elective/Lab)"
            className="border p-2 w-full"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />

          <input
            type="text"
            placeholder="Version"
            className="border p-2 w-full"
            value={form.version}
            onChange={(e) => handleChange("version", e.target.value)}
          />

          {/* PROGRAMME DROPDOWN */}
          <select
            className="border p-2 w-full"
            value={form.programmeId}
            onChange={(e) => handleChange("programmeId", e.target.value)}
          >
            <option value="">Select Programme</option>
            {programmes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} — {p.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
