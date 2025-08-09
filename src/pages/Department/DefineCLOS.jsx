import React, { useEffect, useState } from "react";

const mockCourses = [
  { id: "1", name: "Data Structures" },
  { id: "2", name: "Operating Systems" },
];
const programmes = [
  { id: "1", name: "Bachelor of Science" },
  { id: "2", name: "Bachelor of Arts" },
];
const mockPOs = {
  1: [
    { id: "PO1", name: "Engineering Knowledge" },
    { id: "PO2", name: "Problem Analysis" },
  ],
  2: [{ id: "PO3", name: "Design/Development" }],
};
const mockPSOs = {
  1: [{ id: "PSO1", name: "Apply Programming" }],
  2: [{ id: "PSO2", name: "System Design" }],
};

const originalFetch = window.fetch;
window.fetch = async (url, options) => {
  if (url.includes("dummyjson.com/courses")) {
    return {
      json: async () => ({ courses: mockCourses }),
    };
  }
  if (url.includes("dummyjson.com/programmes")) {
    return {
      json: async () => ({ programmes }),
    };
  }
  if (url.includes("dummyjson.com/po")) {
    const courseId = url.split("course_id=")[1];
    return {
      json: async () => ({ po: mockPOs[courseId] || [] }),
    };
  }
  if (url.includes("dummyjson.com/pso")) {
    const courseId = url.split("course_id=")[1];
    return {
      json: async () => ({ pso: mockPSOs[courseId] || [] }),
    };
  }
  if (url.includes("dummyjson.com/clos") && options?.method === "POST") {
    alert("CLOs saved!\n\n" + options.body);
    return { json: async () => ({ success: true }) };
  }

  return originalFetch(url, options);
};
const BLOOM_LEVELS = [
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
];

const CORRELATION_LEVELS = [
  { label: "Low", value: 1 },
  { label: "Medium", value: 2 },
  { label: "High", value: 3 },
];

const METHOD_OPTIONS = ["Direct", "Indirect"];

const DefineCLOS = () => {

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [version, setVersion] = useState("");
  const [versionLabel, setVersionLabel] = useState("");
  const [isActive, setIsActive] = useState(true);


  const [clos, setClos] = useState([
    {
      description: "",
      threshold: 70,
      bloom: "",
      poMappings: [],
      psoMappings: [],
    },
  ]);
  const [poList, setPoList] = useState([]);
  const [psoList, setPsoList] = useState([]);

  const [attainments, setAttainments] = useState([
    { method: "", threshold: "", weightage: "", year: "" },
  ]);


  const [preview, setPreview] = useState(false);
  const [msg, setMsg] = useState("");


  useEffect(() => {
   
    fetch("https://dummyjson.com/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []));
  }, []);


  useEffect(() => {
    if (!selectedCourse) return;
  
    fetch(`https://dummyjson.com/po?course_id=${selectedCourse}`)
      .then((res) => res.json())
      .then((data) => setPoList(data.po || []));
    fetch(`https://dummyjson.com/pso?course_id=${selectedCourse}`)
      .then((res) => res.json())
      .then((data) => setPsoList(data.pso || []));
  }, [selectedCourse]);

 
  const handleCLOChange = (idx, field, value) => {
    setClos((prev) =>
      prev.map((clo, i) => (i === idx ? { ...clo, [field]: value } : clo))
    );
  };

  const handleCLOMapping = (idx, field, mappingList) => {
    setClos((prev) =>
      prev.map((clo, i) => (i === idx ? { ...clo, [field]: mappingList } : clo))
    );
  };

  const addCLO = () => {
    setClos([
      ...clos,
      {
        description: "",
        threshold: 70,
        bloom: "",
        poMappings: [],
        psoMappings: [],
      },
    ]);
  };

  const removeCLO = (idx) => {
    setClos(clos.filter((_, i) => i !== idx));
  };

  const handleAttainmentChange = (idx, field, value) => {
    setAttainments((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, [field]: value } : a))
    );
  };

  const addAttainment = () => {
    setAttainments([
      ...attainments,
      { method: "", threshold: "", weightage: "", year: "" },
    ]);
  };

  const removeAttainment = (idx) => {
    setAttainments(attainments.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setMsg("");
 
    const payload = {
      course_id: selectedCourse,
      version,
      version_label: versionLabel,
      is_active: isActive,
      clos,
      attainments,
    };
    try {
     
      await fetch("https://dummyjson.com/clos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setMsg("CLOs saved successfully!");
    } catch {
      setMsg("Error saving CLOs.");
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        Define Course Learning Outcomes (CLOs)
      </h2>
    
      <div className="mb-6">
        <label className="block mb-1">Course</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="flex gap-4 mt-2">
          <div>
            <label className="block mb-1">Version</label>
            <input
              type="number"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="border px-2 py-1 rounded"
              min={1}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Version Label</label>
            <input
              type="text"
              value={versionLabel}
              onChange={(e) => setVersionLabel(e.target.value)}
              className="border px-2 py-1 rounded"
              placeholder="e.g. 2025 Batch"
              required
            />
          </div>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="mr-2"
            />
            <label>Is Active?</label>
          </div>
        </div>
      </div>

   
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">CLOs</span>
          <button
            type="button"
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={addCLO}
          >
            + Add CLO
          </button>
        </div>
        <table className="w-full border mb-2">
          <thead>
            <tr className="bg-gray-100">
              <th>Description</th>
              <th>Threshold (%)</th>
              <th>Bloom’s Level</th>
              <th>PO Mapping</th>
              <th>PSO Mapping</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clos.map((clo, idx) => (
              <tr key={idx}>
                <td>
                  <textarea
                    value={clo.description}
                    onChange={(e) =>
                      handleCLOChange(idx, "description", e.target.value)
                    }
                    className="border rounded-lg w-full min-w-[180px] py-2 px-3 resize-y focus:outline-blue-400"
                    required
                    rows={2}
                    placeholder="Enter CLO description"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={clo.threshold}
                    onChange={(e) =>
                      handleCLOChange(idx, "threshold", e.target.value)
                    }
                    className="border rounded-lg w-full min-w-[80px] py-2 px-3 focus:outline-blue-400"
                    min={0}
                    max={100}
                    required
                    placeholder="70"
                  />
                </td>
                <td>
                  <select
                    value={clo.bloom}
                    onChange={(e) =>
                      handleCLOChange(idx, "bloom", e.target.value)
                    }
                    className="border rounded-lg w-full min-w-[120px] py-2 px-3 focus:outline-blue-400"
                    required
                  >
                    <option value="">Select</option>
                    {BLOOM_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    multiple
                    value={clo.poMappings.map((m) => m.po_id)}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions).map(
                        (opt) => ({
                          po_id: opt.value,
                          correlation: 1, 
                        })
                      );
                      handleCLOMapping(idx, "poMappings", selected);
                    }}
                    className="border rounded-lg w-full min-w-[140px] py-2 px-3 focus:outline-blue-400"
                  >
                    {poList.map((po) => (
                      <option key={po.id} value={po.id}>
                        {po.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    multiple
                    value={clo.psoMappings.map((m) => m.pso_id)}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions).map(
                        (opt) => ({
                          pso_id: opt.value,
                          correlation: 1,
                        })
                      );
                      handleCLOMapping(idx, "psoMappings", selected);
                    }}
                    className="border rounded-lg w-full min-w-[140px] py-2 px-3 focus:outline-blue-400"
                  >
                    {psoList.map((pso) => (
                      <option key={pso.id} value={pso.id}>
                        {pso.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">
            Attainment Thresholds (Optional)
          </span>
          <button
            type="button"
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={addAttainment}
          >
            + Add
          </button>
        </div>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Method</th>
              <th>Threshold (%)</th>
              <th>Weightage (%)</th>
              <th>Applicable Year</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {attainments.map((a, idx) => (
              <tr key={idx}>
                <td>
                  <select
                    value={a.method}
                    onChange={(e) =>
                      handleAttainmentChange(idx, "method", e.target.value)
                    }
                    className="border rounded-lg w-full min-w-[120px] py-2 px-3 focus:outline-blue-400"
                  >
                    <option value="">Select</option>
                    {METHOD_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={a.threshold}
                    onChange={(e) =>
                      handleAttainmentChange(idx, "threshold", e.target.value)
                    }
                    className="border rounded-lg w-full min-w-[80px] py-2 px-3 focus:outline-blue-400"
                    min={0}
                    max={100}
                    placeholder="Threshold"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={a.weightage}
                    onChange={(e) =>
                      handleAttainmentChange(idx, "weightage", e.target.value)
                    }
                    className="border rounded-lg w-full min-w-[80px] py-2 px-3 focus:outline-blue-400"
                    min={0}
                    max={100}
                    placeholder="Weightage"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={a.year}
                    onChange={(e) =>
                      handleAttainmentChange(idx, "year", e.target.value)
                    }
                    className="border rounded-lg w-full min-w-[100px] py-2 px-3 focus:outline-blue-400"
                    placeholder="Year"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setPreview(!preview)}
        >
          {preview ? "Hide Preview" : "Preview"}
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
        {msg && <div className="mt-2 text-green-600">{msg}</div>}
      </div>
      {preview && (
        <div className="border rounded p-4 bg-gray-50">
          <h3 className="font-bold mb-2">CLOs Preview</h3>
          <table className="w-full border">
            <thead>
              <tr>
                <th>Description</th>
                <th>Threshold</th>
                <th>Bloom</th>
                <th>POs</th>
                <th>PSOs</th>
              </tr>
            </thead>
            <tbody>
              {clos.map((clo, idx) => (
                <tr key={idx}>
                  <td>{clo.description}</td>
                  <td>{clo.threshold}</td>
                  <td>{clo.bloom}</td>
                  <td>
                    {clo.poMappings
                      .map((m) => {
                        const po = poList.find((p) => p.id === m.po_id);
                        return po ? `${po.name} (L${m.correlation})` : "";
                      })
                      .join(", ")}
                  </td>
                  <td>
                    {clo.psoMappings
                      .map((m) => {
                        const pso = psoList.find((p) => p.id === m.pso_id);
                        return pso ? `${pso.name} (L${m.correlation})` : "";
                      })
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DefineCLOS;
