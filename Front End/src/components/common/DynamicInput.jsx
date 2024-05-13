import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { ReactComponent as EyeSlashIcon } from "../../assets/icon/ic_eye-slash.svg";
import { ReactComponent as EyeIcon } from "../../assets/icon/ic_eye.svg";
import useTheme from "../context/useTheme";

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Datepicker from "react-tailwindcss-datepicker";

function DynamicInput({
  label,
  icon,
  name,
  value,
  options,
  color,
  type,
  disabled,
  placeholder,
  onChange,
  className,
}) {
  const [isPassword, setIsPassword] = useState(false);
  const { isDarkMode } = useTheme();
  const [image, setImage] = useState(null);

  const animatedComponents = makeAnimated();
  const handlePhoneInputChange = (inputValue) => {
    if (inputValue?.startsWith("+0")) {
      inputValue = "+62" + inputValue.slice(2);
    }

    onChange(inputValue);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (selectedImage && selectedImage.size > maxSize) {
      alert("Ukuran file terlalu besar. Maksimum 20MB diperbolehkan.");
      event.target.value = null;
      return;
    }
    setImage(URL.createObjectURL(selectedImage));
    onChange(selectedImage);
  };
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file && file.size > maxSize) {
      alert("Ukuran file terlalu besar. Maksimum 20MB diperbolehkan.");
      e.target.value = null;
      return;
    }
    setImage(URL.createObjectURL(file));
    onChange(file);
  };


  const handleChangeInputArray = (index, event) => {
    const updatedValue = [...value];
    updatedValue[index] = { ...updatedValue[index], value: event.target.value };
    onChange(updatedValue);
  };

  let parsedOptions = [];
  try {
    parsedOptions = JSON.parse(options);
  } catch (error) {
    // Handle JSON parsing error here
  }
  return (
    <div className="flex flex-col gap-2 w-full" >
      {label && (
        <span className=" text-base font-semibold text-left">{label}</span>
      )}
      {type === "selection" ? (
        <Select
          className="p-0.5"
          placeholder={placeholder}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: 50,
              backgroundColor: isDarkMode ? '#111017' : '#f6fbf8',
              fontSize: 14,
              borderColor: state.isFocused ? 'grey' : isDarkMode ? '#ffffff20' : '#dddddd',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: isDarkMode ? '#111017' : '#f6fbf8',
            }),

          }}
          onChange={(selected) => {
            onChange(selected);
          }}
          components={animatedComponents}
          defaultValue={value}
          options={options}
        />
      ) : type === "multi_selection" ? (
        <Select
          className="p-0.5"
          placeholder={placeholder}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: 50,
              backgroundColor: isDarkMode ? '#111017' : '#f6fbf8',
              fontSize: 14,
              borderColor: state.isFocused ? 'grey' : isDarkMode ? '#ffffff20' : '#dddddd',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: isDarkMode ? '#111017' : '#f6fbf8',
            }),

          }}
          onChange={(selected) => {
            onChange(selected);
          }}
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={value}
          isMulti
          options={options}
        />
      ) : type === "radio_button" ? (
        <div className="flex flex-row gap-2 items-center">
          {options.map((item, index) => (
            <label key={index} className="flex flex-row gap-2">
              <input
                type="checkbox"
                value={item.value}
                className="text-sm"
                checked={item.value === value}
                onChange={(event) => onChange(event.target.value)}
              />
              {item.label}
            </label>
          ))}
        </div>
      ) :
        type === "tel" ? (
          <div className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}>
            <PhoneInput
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              className="h-7 flex-1 text-sm w-full "
              defaultCountry="ID"
              countries={["ID"]}
              onChange={handlePhoneInputChange}
            />
          </div>
        ) : type === "editor" ? (
          <div className={`flex flex-row min-h-[300px] overflow-hidden bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}>
            <Editor
              editorState={value}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorStyle={{ lineHeight: '10%', padding: 16 }}
              onEditorStateChange={(event) => onChange(event)}
            />
          </div>
        ) : type === "textarea" ? (
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            <textarea
              className="h-full flex-1 w-full bg-lightColor dark:bg-darkColor text-sm  min-h-[150px]"
              name={name}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              style={{ outline: "none" }}
              onChange={(event) => onChange(event.target.value)}
              rows="5"
            />
          </div>
        ) : type === "select_number" ? (
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            {icon &&
              React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
            <input
              type={'number'}
              className="h-7 flex-1 w-full text-sm  bg-transparent"
              name={name}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              style={{ outline: "none" }}
              onChange={(event) => onChange(event.target.value)}
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
            />
            <div className="flex flex-row gap-2">
              {parseInt(value) > 0 && <button onClick={() => onChange(parseInt(value) - 1)} className="bg-red-400">
                <EyeIcon className="h-7 w-6" fill="#666666" />
              </button>}
              <button onClick={() => onChange(value === '' ? 1 : parseInt(value) + 1)} className="bg-blue-400">
                <EyeIcon className="h-7 w-6" fill="#666666" />
              </button>
            </div>

          </div>
        ) : type === "date" ? (
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            <Datepicker
              value={value}
              onChange={(newValue) => {
                onChange(newValue)
              }}
              showShortcuts={false}
            />
          </div>
        ) : type === "image_upload" ? (
          <div className="flex flex-col gap-2">
            <div
              className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center  p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
            >
              <input type="file" onChange={handleImageChange} accept="image/jpeg, image/png"
                maxSize={2 * 1024 * 1024} />
            </div>
            {image && (
              <div
                className={`flex flex-col gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor  p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
              >
                <span className="text-base font-semibold">Preview Gambar</span>
                <img src={image} alt="Preview" className="w-full max-h-56 object-contain" />
              </div>
            )}
          </div>
        ) : type === "file_upload" ? (
          <div className="flex flex-col gap-2">
            <div
              className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center  p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
            >
              <input type="file" onChange={handlePdfChange} accept="application/pdf"
                maxSize={20 * 1024 * 1024} />
            </div>
            {image && (
              <div
                className={`flex flex-col gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor  p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
              >
                <span className="text-base font-semibold">Preview File</span>
                <embed src={image} type="application/pdf" className="w-full h-96" />
              </div>
            )}
          </div>
        ) : type === "input_array" ? (
          <div className="flex flex-col gap-2">
            {value?.map((item, index) => (
              <div key={index} className=" flex flex-row gap-3 items-center">
                <div className="flex flex-1 max-w-[160px]">
                  <span className="text-base font-semibold line-clamp-1">{item.label} :</span>
                </div>
                <div
                  className={`flex flex-1 flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
                >
                  <input
                    type={"text"}
                    className="h-7 flex-1 w-full text-sm  bg-transparent"
                    name={name}
                    placeholder={placeholder}
                    value={item.value}
                    disabled={disabled}
                    style={{ outline: "none" }}
                    onChange={(event) => handleChangeInputArray(index, event)}
                    onFocus={(e) =>
                      e.target.addEventListener(
                        "wheel",
                        function (e) {
                          e.preventDefault();
                        },
                        { passive: false }
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            {icon &&
              React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
            <input
              type={type === "password" && isPassword ? "text" : type}
              className="h-7 flex-1 w-full text-sm  bg-transparent"
              name={name}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              style={{ outline: "none" }}
              onChange={(event) => onChange(event.target.value)}
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
            />
            {type === "password" && (
              <button onClick={() => setIsPassword(!isPassword)}>
                {isPassword ? (
                  <EyeIcon className="h-7 w-6" fill="#666666" />
                ) : (
                  <EyeSlashIcon className="h-7 w-6" fill="#666666" />
                )}
              </button>
            )}
          </div>
        )}

    </div>
  )
}

export default DynamicInput;
