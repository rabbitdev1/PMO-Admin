import React, { useState } from "react";

function OTPInput({ onChange }) {
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const [activeInput, setActiveInput] = useState("");

  const handleChange = (inputName, e) => {
    const { value } = e.target;
    const updatedOtp = { ...otp, [inputName]: value };
    setOtp(updatedOtp);
    onChange(Object.values(updatedOtp).join(""));
  };
  const inputfocus = (e) => {
    const nextSibling = e.target.nextSibling;

    if (e.key >= 0 && e.key <= 9) {
      if (nextSibling && e.target.value) {
        nextSibling.focus();
      }
    }
    if (e.key === "Backspace" && !e.target.value) {
      if (nextSibling) {
        nextSibling.focus();
      }
    }
  };

  return (
    <div className=" flex gap-2 ">
      {Object.keys(otp).map((inputName, index) => (
        <input
          key={index}
          name={inputName}
          type="text"
          pattern="[0-9]*"
          autoComplete="off"
          className={`w-full clip-path-otp aspect-square sm:text-3xl text-lg font-bold text-center rounded-xl text-[#1b1b41] ${
            activeInput === inputName ? "bg-[#0185FF]" : "bg-[#EDEEEE]"
          } outline-none`}
          value={otp[inputName]}
          onChange={(e) => handleChange(inputName, e)}
          onFocus={() => setActiveInput(inputName)}
          onBlur={() => setActiveInput("")}
          tabIndex={index + 1}
          maxLength={1}
          onKeyUp={inputfocus}
        />
      ))}
    </div>
  );
}

export default OTPInput;
