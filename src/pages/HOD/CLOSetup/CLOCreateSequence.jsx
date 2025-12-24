import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HOD_API from "../../../apis/HOD";
import { useAuth } from "../../../contexts/AuthContext";

const bloomLevels = [
  "REMEMBER",
  "UNDERSTAND",
  "APPLY",
  "ANALYZE",
  "EVALUATE",
  "CREATE",
];

const CLOCreateSequence = () => {
  const { courseId, count } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const total = Number(count);
  const [index, setIndex] = useState(1);

  const [form, setForm] = useState({
    description: "",
    bloomLevel: "",
    version: "1.0",
    threshold: 50, // default midpoint
  });

  const autoCLOCode = `CLO${index}`;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!form.description.trim()) return "Description is required";
    if (!form.bloomLevel) return "Bloom level is required";

    if (form.threshold < 40 || form.threshold > 70)
      return "Threshold must be between 40% and 70%";

    return null;
  };

  const saveCLO = async () => {
    const error = validate();
    if (error) return alert(error);

    const payload = {
      cloCode: autoCLOCode,
      description: form.description,
      bloomLevel: form.bloomLevel,
      version: form.version,
      threshold: Number(form.threshold),
      courseId,
    };

    try {
      await HOD_API.clos.createCLO(payload);

      if (index < total) {
        setIndex(index + 1);
        setForm({
          description: "",
          bloomLevel: "",
          version: "1.0",
          threshold: 50,
        });
      } else {
        alert("All CLOs created successfully!");
        navigate(`/hod/courses/${courseId}/clos`);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create CLO");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1">
        Create CLO {index} of {total}
      </h1>

      <p className="text-gray-600 mb-4">
        CLO Code: <strong>{autoCLOCode}</strong>
      </p>

      <div className="space-y-4">
        <textarea
          placeholder="CLO Description"
          className="border p-2 w-full"
          rows={3}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={form.bloomLevel}
          onChange={(e) => handleChange("bloomLevel", e.target.value)}
        >
          <option value="">Select Bloom Level</option>
          {bloomLevels.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Threshold (%)"
          value={form.threshold}
          min="40"
          max="70"
          onChange={(e) => handleChange("threshold", e.target.value)}
        />

        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Version"
          value={form.version}
          onChange={(e) => handleChange("version", e.target.value)}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={saveCLO}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {index < total ? "Save & Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CLOCreateSequence;
