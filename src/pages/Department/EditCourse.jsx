import React, { useEffect, useState } from "react";

const EditCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedId, setSelectedId] = useState("");
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

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/courses");
        const data = await res.json();
        setCourses(data.courses || []);
      } catch {
        setMsg("Error fetching courses list.");
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  
  useEffect(() => {
    if (!selectedId) return;
    const fetchCourse = async () => {
      setLoading(true);
      setMsg("");
      try {
        const res = await fetch(`https://dummyjson.com/courses/${selectedId}`);
        const data = await res.json();
        setForm({
          name: data.name || "",
          type: data.type || "",
          credits: data.credits || "",
          is_optional: data.is_optional || false,
          level: data.level || "",
          start_date: data.start_date ? data.start_date.slice(0, 10) : "",
        });
      } catch {
        setMsg("Error fetching course data.");
      }
      setLoading(false);
    };
    fetchCourse();
  }, [selectedId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`https://dummyjson.com/courses/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      await res.json();
      setMsg("Course updated successfully!");
    } catch {
      setMsg("Error updating course.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Course</h2>
     
      <div className="mb-4">
        <label className="block mb-1">Select Course</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
        >
          <option value="">-- Select a course --</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
     
      {selectedId && (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Updating..." : "Update Course"}
          </button>
          {msg && <div className="mt-2 text-green-600">{msg}</div>}
        </form>
      )}
      {loading && <div className="mt-2 text-blue-600">Loading...</div>}
      {msg && !selectedId && <div className="mt-2 text-red-600">{msg}</div>}
    </div>
  );
};

export default EditCourse;