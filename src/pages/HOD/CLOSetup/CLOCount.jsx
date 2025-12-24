import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CLOCount = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [count, setCount] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();

    const n = Number(count);
    if (!Number.isInteger(n) || n < 1)
      return alert("Enter a valid positive integer");
    if (n > 50) return alert("Please enter a smaller number (max 50)");

    navigate(`/hod/courses/${courseId}/create-clos/${n}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">CLO Count</h1>
        <button
          className="px-3 py-1 bg-gray-100 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-sm text-gray-600 mb-3">Course ID: {courseId}</p>

        <form onSubmit={handleNext} className="space-y-4">
          <label className="block text-sm text-gray-700">
            Number of CLOs to create
          </label>
          <input
            type="number"
            min="1"
            max="50"
            className="border p-2 w-full"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CLOCount;
