import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HOD_API from "../../../apis/HOD";

const CLOList = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [clos, setClos] = useState([]);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    loadCLOs();
    loadCourse();
  }, []);

  const loadCLOs = async () => {
    try {
      const res = await hodAPI.getCLOsByCourse(courseId);
      setClos(res.data || []);
    } catch (err) {
      console.error("Error loading CLOs:", err);
    }
  };

  const loadCourse = async () => {
    try {
      const res = await hodAPI.getCourseById(courseId);
      setCourse(res.data);
    } catch (err) {
      console.log("Course load error:", err);
    }
  };

  const handleEdit = (clo) => {
    navigate(`/hod/courses/${courseId}/clos/edit/${clo.id}`);
  };

  const handleAddCLO = () => {
    navigate(`/hod/courses/${courseId}/clo-count`);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">CLOs for Course</h1>
          {course && (
            <p className="text-gray-600 mt-1">
              <strong>{course.code}</strong> — {course.name}
            </p>
          )}
        </div>

        <button
          onClick={handleAddCLO}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add CLOs
        </button>
      </div>

      {/* LIST TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">CLO Code</th>
              <th className="border px-3 py-2">Description</th>
              <th className="border px-3 py-2">Bloom Level</th>
              <th className="border px-3 py-2">Version</th>
              <th className="border px-3 py-2">Threshold</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clos.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No CLOs have been created for this course yet.
                </td>
              </tr>
            )}

            {clos.map((clo) => (
              <tr key={clo.id}>
                <td className="border px-3 py-2 font-semibold">
                  {clo.cloCode}
                </td>
                <td className="border px-3 py-2">{clo.description}</td>
                <td className="border px-3 py-2">{clo.bloomLevel}</td>
                <td className="border px-3 py-2">{clo.version}</td>
                <td className="border px-3 py-2">{clo.threshold}%</td>

                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      clo.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {clo.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="border px-3 py-2">
                  <button
                    onClick={() => handleEdit(clo)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CLOList;
