
import React, { useState } from 'react';
import CreateCourse from './CreateCourse';
import EditCourse from './EditCourse';
import FacultyAssignment from './FacultyAssignment';
import DefineCLOS from './DefineCLOS';

const DeptDash = () => {
  return (
    <>
    <Navbar />
    <CreateCourse />
    <EditCourse />
    <FacultyAssignment />
    <DefineCLOS />
    <h1 className="text-3xl font-bold underline text-blue-500 bg-yellow-200">DEPARTMENT DASHBOARD</h1>
    </>
  )
}

export default DeptDash



const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="px-4 py-2 hover:bg-gray-200 rounded"
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
      >
        {label}
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {items.map((item, idx) => (
            <button
              key={idx}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => (
  <nav className="flex items-center bg-yellow-200 px-6 py-3 shadow gap-4">
    <span className="font-bold text-blue-600 text-xl mr-8">Department Dashboard</span>
    <Dropdown
      label="Courses"
      items={[
        { label: "Create Course", onClick: () => { } },
        { label: "Edit Course", onClick: () => {} },
        { label: "Update Course", onClick: () => {} },
        { label: "Delete Course", onClick: () => {} },
      ]}
    />
    <Dropdown
      label="View Courses"
      items={[
        { label: "View All Courses", onClick: () => {} },
      ]}
    />
    <Dropdown
      label="Map Courses"
      items={[
        { label: "View Mappings", onClick: () => {} },
        { label: "Edit Mappings", onClick: () => {} },
      ]}
    />
    <Dropdown
      label="Reports"
      items={[
        { label: "View All Reports", onClick: () => {} },
      ]}
    />
    <Dropdown
      label="Question Bank"
      items={[
        { label: "View All", onClick: () => {} },
      ]}
    />
     <Dropdown
      label="Assign Faculty to Course"
      items={[
        { label: "View past assignments", onClick: () => {} },
      ]}
    />
    <Dropdown
      label="Manage PO & PSO"
      items={[
        { label: "View All", onClick: () => {} },
      ]}
    />
  </nav>
);

