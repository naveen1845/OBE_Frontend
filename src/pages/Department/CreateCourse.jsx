import React, { useState,useEffect } from "react";

const CreateCourse = () => {
  const dept_id = 1;

  const [form, setForm] = useState({
    name: "",
    type: "",
    credits: "",
    is_optional: false,
    level: "",
    start_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [programmes, setProgrammes] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState("");
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const res = await fetch("https://dummyjson.com/programmes");
        const data = await res.json();
        setProgrammes(data.programmes || []);
      } catch {
        setMsg("Error fetching programmes.");
      }
    };
    fetchProgrammes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));n
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("https://dummyjson.com/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          dept_id,
          programme_id: selectedProgramme,
        }),
      });
      const data = await res.json();
      setMsg("Course created successfully!");
      setForm({
        name: "",
        type: "",
        credits: "",
        is_optional: false,
        level: "",
        start_date: "",
      });
    } catch (err) {
      setMsg("Error creating course.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Programme</label>
          <select
            value={selectedProgramme}
            onChange={(e) => setSelectedProgramme(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">-- Select Programme --</option>
            {programmes.map((prog) => (
              <option key={prog.id} value={prog.id}>
                {prog.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Type</label>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
            placeholder="e.g. Core/Elective"
          />
        </div>
        <div>
          <label className="block mb-1">Credits</label>
          <input
            name="credits"
            type="number"
            value={form.credits}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
            min="0"
          />
        </div>
        <div>
          <label className="block mb-1">Level</label>
          <input
            name="level"
            value={form.level}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
            placeholder="e.g. UG/PG"
          />
        </div>
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            name="start_date"
            type="date"
            value={form.start_date}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            name="is_optional"
            type="checkbox"
            checked={form.is_optional}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Is Optional</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
        {msg && <div className="mt-2 text-green-600">{msg}</div>}
      </form>
    </div>
  );
};

export default CreateCourse;
