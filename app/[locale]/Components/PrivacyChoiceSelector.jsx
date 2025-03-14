// components/PrivacyToggle.jsx
"use client";

import { useState } from "react";

const PrivacyToggle = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div className="inline-flex items-center">
      <button
        onClick={() => setChecked(!checked)}
        className="relative inline-flex h-5 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent focus:outline-none focus:ring-0"
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`
            absolute mx-0.5 my-0.5 h-3.5 w-6.5 rounded-full 
            transition-colors duration-200 ease-in-out
            ${checked ? "bg-blue-600" : "bg-gray-200"}
          `}
        />
        <span
          className={`
            pointer-events-none relative inline-block h-3.5 w-3.5
            transform rounded-full bg-white shadow ring-0
            transition duration-200 ease-in-out
            ${checked ? "translate-x-3.5" : "translate-x-0"}
          `}
          style={{ marginTop: "2px", marginLeft: "1px" }}
        />
      </button>
    </div>
  );
};

export default PrivacyToggle;
