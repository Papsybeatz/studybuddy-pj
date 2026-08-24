import React from "react";

const UploadZone: React.FC = () => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Upload Zone</h2>
      <p className="mt-1 text-sm text-gray-600">
        Drag and drop notes, PDF handouts, or paste text to generate study material.
      </p>
      <div className="mt-4 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 px-4 py-8 text-center">
        <p className="text-sm font-medium text-indigo-700">Drop file here</p>
        <p className="mt-1 text-xs text-indigo-600">PDF, DOCX, TXT up to 10MB</p>
      </div>
    </section>
  );
};

export default UploadZone;
