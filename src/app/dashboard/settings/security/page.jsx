"use client";

import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useState, useCallback } from "react";

const Security = () => {
  const initialFormState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      ErrorToast("Please fill in all required fields.");
      return;
    }

    const response = await fetch("/api/settings/profile/change/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const rspJson = await response.json();
    if (!rspJson.success) {
      ErrorToast(rspJson.message);
      return;
    }
    setFormData(initialFormState);
    SuccessToast("Password changes successfully!");
  };

  return (
    <div className="shadow-light py-7 px-4 rounded-md bg-white">
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
        <div>
          <input
            type="oldPassword"
            name="oldPassword"
            placeholder="Old Password"
            className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
            onChange={handleInputChange}
            value={formData.oldPassword}
          />
        </div>
        <div>
          <input
            type="newPassword"
            name="newPassword"
            placeholder="New Password"
            className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
            onChange={handleInputChange}
            value={formData.newPassword}
          />
        </div>
        <div>
          <input
            type="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="bg-[#8C57FF] text-white py-2 px-4 rounded-md hover:bg-[#7745e0] duration-200"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;
