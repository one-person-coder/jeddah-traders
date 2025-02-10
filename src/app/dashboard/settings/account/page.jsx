"use client";

import { useState, useCallback } from "react";

const Account = () => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    country: "",
    city: "",
    skills: "",
    overview: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <div className="shadow-light py-7 px-4 rounded-md bg-white">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <input
            type="fullName"
            name="fullName"
            placeholder="Full Name"
            className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="username"
            name="username"
            placeholder="Username"
            className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="oldPassword"
            name="oldPassword"
            placeholder="Old Password"
            className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="newPassword"
            name="newPassword"
            placeholder="New Password"
            className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
            onChange={handleInputChange}
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="bg-[#8C57FF] text-white py-2 px-4 rounded-md hover:bg-[#7745e0] duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
