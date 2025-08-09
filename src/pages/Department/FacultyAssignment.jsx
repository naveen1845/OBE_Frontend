import React, { useEffect, useState } from "react";

const FacultyAssignment = () => {
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState({
    semester: "",
    year: "",
    teaching_methodology: "",
    assessment_mode: "",
    faculty_id: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
 
        const res = await fetch("https://dummyjson.com/courses");
        const data = await res.json();
        setCourses(data.courses || []);
      } catch {
        setMsg("Error fetching courses.");
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
   
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        setFaculties(data.users || []);
      } catch {
        setMsg("Error fetching faculties.");
      }
    };
    fetchFaculties();
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setForm({
      semester: "",
      year: "",
      teaching_methodology: "",
      assessment_mode: "",
      faculty_id: "",
    });
    setMsg("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      
      await fetch("https://dummyjson.com/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: selectedCourse.id,
          ...form,
        }),
      });
      setMsg("Faculty assigned successfully!");
      setForm({
        semester: "",
        year: "",
        teaching_methodology: "",
        assessment_mode: "",
        faculty_id: "",
      });
      setSelectedCourse(null);
    } catch {
      setMsg("Error assigning faculty.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Faculty Assignment</h2>
      {!selectedCourse ? (
        <>
          <div className="mb-4">
            <label className="block mb-1">Select a Course</label>
            <ul className="divide-y border rounded">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCourseSelect(course)}
                >
                  <span className="font-semibold">{course.name}</span> (ID: {course.id})
                </li>
              ))}
            </ul>
          </div>
          {loading && <div className="mt-2 text-blue-600">Loading...</div>}
          {msg && <div className="mt-2 text-red-600">{msg}</div>}
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Course ID</label>
            <input
              value={selectedCourse.id}
              disabled
              className="w-full border px-2 py-1 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1">Course Name</label>
            <input
              value={selectedCourse.name}
              disabled
              className="w-full border px-2 py-1 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1">Semester</label>
            <input
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
              placeholder="e.g. 1, 2, 3..."
            />
          </div>
          <div>
            <label className="block mb-1">Year</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
              placeholder="e.g. 2025"
            />
          </div>
          <div>
            <label className="block mb-1">Teaching Methodology</label>
            <input
              name="teaching_methodology"
              value={form.teaching_methodology}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
              placeholder="e.g. Lecture, Lab, Seminar"
            />
          </div>
          <div>
            <label className="block mb-1">Assessment Mode</label>
            <input
              name="assessment_mode"
              value={form.assessment_mode}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
              placeholder="e.g. Exam, Project"
            />
          </div>
          <div>
            <label className="block mb-1">Assign Faculty</label>
            <select
              name="faculty_id"
              value={form.faculty_id}
              onChange={handleChange}
              required
              className="w-full border px-2 py-1 rounded"
            >
              <option value="">-- Select Faculty --</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.firstName} {faculty.lastName}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Assigning..." : "Assign Faculty"}
          </button>
          <button
            type="button"
            className="ml-4 px-4 py-2 bg-gray-300 rounded"
            onClick={() => setSelectedCourse(null)}
          >
            Cancel
          </button>
          {msg && <div className="mt-2 text-green-600">{msg}</div>}
        </form>
      )}
    </div>
  );
}
export default FacultyAssignment;