"use client";

import { useState, useCallback } from "react";

const Account = () => {
  const [categories, setCategories] = useState([]);
  const [focus, setFocus] = useState(false);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() && categories.length <= 7) {
      setCategories((prev) => [...prev, e.target.value]);
      setFormData((prev) => ({ ...prev, skills: "" }));
    } else if (
      e.key == "Backspace" &&
      e.target.value === "" &&
      categories.length >= 1
    ) {
      e.preventDefault();
      const updatedSkills = categories.pop();
      setFormData((prev) => ({
        ...prev,
        skills: updatedSkills,
      }));
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <div className="shadow-light py-7 px-4 rounded-md bg-white">
      <div className="grid sm:grid-cols-2 gap-6">
        {["firstName", "lastName", "username", "email", "country", "city"].map(
          (field) => (
            <div key={field}>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                value={formData[field]}
                onChange={handleInputChange}
              />
            </div>
          )
        )}
        <div
          className={`sm:col-span-2 flex items-center border-[2px] border-transparent focus-visible:outline-none rounded-[6px] duration-200 py-[9px] px-3 ${
            focus ? `!border-[#8C57FF]` : "outline outline-1 outline-[#d1cfd4]"
          }`}
        >
          <div className="whitespace-nowrap flex gap-2">
            {categories.map((category, index) => (
              <div
                key={category + index}
                className="bg-[#8C57FF] py-[5px] text-[14px] rounded-md text-white px-3"
              >
                {category}
              </div>
            ))}
          </div>
          <input
            type="text"
            name="skills"
            placeholder="Skills"
            className={`w-full focus-visible:outline-none ${
              categories.length >= 1 ? "px-2" : ""
            }`}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={handleKeyDown}
            value={formData.skills}
            onChange={handleInputChange}
          />
        </div>
        <div className="sm:col-span-2">
          <textarea
            name="overview"
            placeholder="Overview"
            className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF] min-h-40 max-h-60"
            value={formData.overview}
            onChange={handleInputChange}
          ></textarea>
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
