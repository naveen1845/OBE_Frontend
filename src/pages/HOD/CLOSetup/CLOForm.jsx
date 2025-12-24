import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HOD_API from "../../../apis/HOD";

const bloomLevels = [
	"REMEMBER",
	"UNDERSTAND",
	"APPLY",
	"ANALYZE",
	"EVALUATE",
	"CREATE",
];

const CLOForm = () => {
	const { courseId, count } = useParams();
	const navigate = useNavigate();

	const total = Number(count) || 0;

	const initialForms = useMemo(() => {
		return Array.from({ length: total }, (_, i) => ({
			description: "",
			bloomLevel: "",
			version: "1.0",
			threshold: 50,
			cloCode: `CLO${i + 1}`,
		}));
	}, [total]);

	const [forms, setForms] = useState(initialForms);
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (index, field, value) => {
		setForms((prev) => {
			const copy = [...prev];
			copy[index] = { ...copy[index], [field]: value };
			return copy;
		});
	};

	const validateOne = (f) => {
		if (!f.description?.trim()) return "Description required";
		if (!f.bloomLevel) return "Bloom level required";
		if (Number(f.threshold) < 40 || Number(f.threshold) > 70)
			return "Threshold must be between 40 and 70";
		return null;
	};

	const handleSubmit = async () => {
		if (forms.length === 0) return alert("No CLOs to create");

		// Validate
		for (let i = 0; i < forms.length; i++) {
			const err = validateOne(forms[i]);
			if (err) return alert(`CLO ${i + 1}: ${err}`);
		}

		setSubmitting(true);
		try {
			const cloArray = forms.map((f) => ({
				cloCode: f.cloCode,
				description: f.description,
				bloomLevel: f.bloomLevel,
				version: f.version,
				threshold: Number(f.threshold),
			}));

			// Use the helper which encapsulates creation logic (currently sequential,
			// but centralised here so it can be switched to a true bulk endpoint later)
			await HOD_API.clos.createMultipleCLOs(courseId, cloArray);

			alert("All CLOs created successfully");
			navigate(`/hod/courses/${courseId}/clos`);
		} catch (err) {
			alert(err.response?.data?.error || "Failed to create CLOs");
		} finally {
			setSubmitting(false);
		}
	};

	if (total <= 0) {
		return (
			<div className="p-6">
				<p>Invalid CLO count. Go back and enter a valid number.</p>
				<div className="mt-4">
					<button
						onClick={() => navigate(-1)}
						className="px-4 py-2 bg-gray-300 rounded"
					>
						Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-semibold mb-4">Create {total} CLO(s)</h1>

			<div className="space-y-6">
				{forms.map((f, idx) => (
					<div key={idx} className="border rounded p-4">
						<div className="flex justify-between items-center mb-2">
							<h3 className="font-medium">{f.cloCode} — CLO {idx + 1}</h3>
							<span className="text-sm text-gray-600">{`CLO ${idx + 1} of ${total}`}</span>
						</div>

						<textarea
							rows={3}
							className="border p-2 w-full mb-2"
							placeholder="CLO Description"
							value={f.description}
							onChange={(e) => handleChange(idx, "description", e.target.value)}
						/>

						<select
							className="border p-2 w-full mb-2"
							value={f.bloomLevel}
							onChange={(e) => handleChange(idx, "bloomLevel", e.target.value)}
						>
							<option value="">Select Bloom Level</option>
							{bloomLevels.map((b) => (
								<option key={b} value={b}>
									{b}
								</option>
							))}
						</select>

						<div className="grid grid-cols-2 gap-3">
							<input
								type="number"
								className="border p-2"
								placeholder="Threshold (%)"
								min="40"
								max="70"
								value={f.threshold}
								onChange={(e) => handleChange(idx, "threshold", e.target.value)}
							/>

							<input
								type="text"
								className="border p-2"
								placeholder="Version"
								value={f.version}
								onChange={(e) => handleChange(idx, "version", e.target.value)}
							/>
						</div>
					</div>
				))}

				<div className="flex justify-between">
					<button
						onClick={() => navigate(-1)}
						className="px-4 py-2 bg-gray-300 rounded"
						disabled={submitting}
					>
						Cancel
					</button>

					<button
						onClick={handleSubmit}
						className="px-4 py-2 bg-blue-600 text-white rounded"
						disabled={submitting}
					>
						{submitting ? "Saving..." : "Save All"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CLOForm;
