import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";

const InputBoxes = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="w-full bg-transparent outline-none"
        />
        {type == "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => tooglePassword()}
              />
            ) : (
              <FaRegEye
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => tooglePassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InputBoxes;
