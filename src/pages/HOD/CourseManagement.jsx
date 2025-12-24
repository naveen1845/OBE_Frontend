import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HOD_API from "../../apis/HOD";

import CourseForm from "./CourseSetup/CourseForm";

const CourseManagement = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await HOD_API.courses.getAll();
      setCourses(res.data || []);
    } catch (err) {
      console.log("Error loading courses", err);
    }
  };

  const handleAddCourse = () => {
    setEditCourse(null);
    setOpenForm(true);
  };

  const handleEdit = (course) => {
    setEditCourse(course);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to deactivate this course?")) return;

    try {
      await HOD_API.courses.delete(id);
      loadCourses();
    } catch (err) {
      alert("Error deleting course");
    }
  };

  const handleCourseSaved = (courseId) => {
    navigate(`/hod/courses/${courseId}/clo-count`);
    loadCourses();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Course Management</h1>

        <button
          onClick={handleAddCourse}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Course
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Code</th>
            <th className="border px-3 py-2 text-left">Name</th>
            <th className="border px-3 py-2 text-left">Credits</th>
            <th className="border px-3 py-2 text-left">Programme</th>
            <th className="border px-3 py-2 text-left">Category</th>
            <th className="border px-3 py-2 text-left">Status</th>
            <th className="border px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td className="border px-3 py-2">{c.code}</td>
              <td className="border px-3 py-2">{c.name}</td>
              <td className="border px-3 py-2">{c.credits}</td>

              <td className="border px-3 py-2">{c.programme?.code || "—"}</td>

              <td className="border px-3 py-2">{c.category}</td>

              <td className="border px-3 py-2">
                {c.isActive ? (
                  <span className="text-green-600 font-medium">Active</span>
                ) : (
                  <span className="text-gray-500">Inactive</span>
                )}
              </td>

              <td className="border px-3 py-2 text-center">
                <button
                  className="px-2 py-1 bg-yellow-400 text-black rounded mr-2"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>

                <button
                  className="px-2 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>

                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded ml-2"
                  onClick={() => navigate(`/hod/courses/${c.id}/clos`)}
                >
                  CLOs
                </button>
              </td>
            </tr>
          ))}

          {courses.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-5 text-gray-500">
                No courses available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <CourseForm
        open={openForm}
        initialData={editCourse}
        onClose={() => setOpenForm(false)}
        onSaved={handleCourseSaved}
      />
    </div>
  );
};

export default CourseManagement;
