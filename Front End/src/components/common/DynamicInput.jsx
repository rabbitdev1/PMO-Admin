import React, { useState } from "react";
import InputMask from "react-input-mask";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ReactComponent as EyeSlashIcon } from "../../assets/icon/ic_eye-slash.svg";
import { ReactComponent as EyeIcon } from "../../assets/icon/ic_eye.svg";
import { ReactComponent as MinusIcon } from "../../assets/icon/ic_minus.svg";
import { ReactComponent as PlusIcon } from "../../assets/icon/ic_plus.svg";
import useTheme from "../context/useTheme";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Datepicker from "react-tailwindcss-datepicker";
import TimePicker from "react-time-picker";

function DynamicInput({
  label,
  icon,
  name,
  value,
  options,
  color,
  noted,
  type,
  disabled,
  placeholder,
  onChange,
  className,
  position,
}) {
  const [isPassword, setIsPassword] = useState(false);
  const { isDarkMode } = useTheme();
  const [image, setImage] = useState(null);
  const [fileType, setFileType] = useState("");

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
    setFileType(file.type);
    onChange(file);
  };

  const handleChangeInputArray = (index, event) => {
    const updatedValue = [...value];
    updatedValue[index] = { ...updatedValue[index], value: event.target.value };
    onChange(updatedValue);
  };

  const renderDocument = (src, type) => {
    switch (type) {
      case "application/pdf":
        return (
          <embed src={src} type="application/pdf" className="w-full h-96" />
        );
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`}
            className="w-full h-96"
            frameBorder="0"
          ></iframe>
        );
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`}
            className="w-full h-96"
            frameBorder="0"
          ></iframe>
        );
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`}
            className="w-full h-96"
            frameBorder="0"
          ></iframe>
        );
      default:
        return <p>Tipe dokumen tidak didukung untuk pratinjau.</p>;
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row items-center gap-2">
        {label && <span className=" text-sm text-left">{label} :</span>}
      </div>
      {type === "selection" ? (
        <div className="flex flex-col">
          <Select
            className="p-0.5 "
            placeholder={placeholder}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                height: 50,
                backgroundColor: isDarkMode ? "#10172a" : "#fefdfe",
                fontSize: 14,
                borderColor: state.isFocused
                  ? "grey"
                  : isDarkMode
                    ? "#ffffff20"
                    : "#dddddd",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: isDarkMode ? "#10172a" : "#fefdfe",
              }),
            }}
            onChange={(selected) => {
              onChange(selected);
            }}
            components={animatedComponents}
            // value={options.find((option) => option.value === value) || null}
            options={options}
          />
           {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "multi_selection" ? (
        <div className="flex flex-col">
          <Select
            className="p-0.5 "
            placeholder={placeholder}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                padding: 5,
                backgroundColor: isDarkMode ? "#10172a" : "#fefdfe",
                fontSize: 14,
                borderColor: state.isFocused
                  ? "grey"
                  : isDarkMode
                    ? "#ffffff20"
                    : "#dddddd",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: isDarkMode ? "#10172a" : "#fefdfe",
              }),
            }}
            onChange={(selected) => {
              onChange(selected);
            }}
            closeMenuOnSelect={false}
            components={animatedComponents}
            // value={options.find((option) => option.value === value) || null}
            isMulti
            options={options}
          />
           {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "radio_button" ? (
        <div className="flex flex-col gap-2">
          <div
            className={`flex ${position === "col" ? "flex-col" : "flex-row items-center"} gap-2 `}
          >
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
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "tel" ? (
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            <PhoneInput
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              className="h-7 flex-1 text-sm w-full"

              defaultCountry="ID"
              countries={["ID"]}
              onChange={handlePhoneInputChange}
            />
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "editor" ? (
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-row min-h-[300px] overflow-hidden bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            <Editor
              editorState={value}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorStyle={{ lineHeight: "10%", padding: 16 }}
              onEditorStateChange={(event) => onChange(event)}
            />
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "textarea" ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div
              className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
            >
              <textarea
                className="h-full flex-1 w-full bg-lightColor dark:bg-darkColor text-sm  min-h-[150px]"
                name={name}
                placeholder={placeholder}
                value={value || ""}
                disabled={disabled}
                style={{ outline: "none" }}
                onChange={(event) => onChange(event.target.value)}
                rows="5"
              />
            </div>
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "select_number" ? (
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            {icon &&
              React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
            <input
              type={"number"}
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
              {parseInt(value) > 1 && (
                <button
                  onClick={() => onChange(parseInt(value) - 1)}
                  className="bg-[#0285ff] p-2 rounded-md"
                >
                  <MinusIcon className="h-3 w-4" fill="#ffffff" />
                </button>
              )}
              <button
                onClick={() => onChange(value === "" ? 1 : parseInt(value) + 1)}
                className="bg-[#0285ff] p-2 rounded-md"
              >
                <PlusIcon className="h-3 w-4" fill="#ffffff" />
              </button>
            </div> 
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "time" ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]">
            <TimePicker
              className="text-sm bg-lightColor dark:bg-darkColor w-full h-6"
              onChange={onChange}
              placeholder={placeholder}
              clearIcon={true}
              value={value}
              disableClock={true}
            />
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "date" ? (
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            <Datepicker
              value={value}
              asSingle
              onChange={(newValue) => {
                onChange(newValue);
              }}
              showShortcuts={false}
            /> 
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "multi_date" ? (
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            <Datepicker
              value={value}
              onChange={(newValue) => {
                onChange(newValue);
              }}
              showShortcuts={false}
            />
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "image_upload" ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div
              className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center  p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
            >
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/jpeg, image/png"
              />
            </div>
            {image && (
              <div
                className={`flex flex-col gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor  p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
              >
                <span className="text-base font-semibold">Preview Gambar</span>
                <img
                  src={image}
                  alt="Preview"
                  className="w-full max-h-56 object-contain"
                />
              </div>
            )}
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "file_upload" ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div
              className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center  p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
            >
              <input
                type="file"
                onChange={handlePdfChange}
                accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
              />
            </div>
            {image && (
              <div
                className={`flex flex-col gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor  p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
              >
                <span className="text-base font-semibold">Preview File</span>
                {renderDocument(image, fileType)}
              </div>
            )}
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "input_array" ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {value?.map((item, index) => (
              <div key={index} className=" flex flex-row gap-3 items-center">
                <div className="flex flex-1 max-w-[160px]">
                  <span className="text-base font-semibold line-clamp-1">
                    {item.label} :
                  </span>
                </div>
                {item.type === "selection" ? (
                  <Select
                    className="p-0.5  flex-1"
                    placeholder={item.placeholder}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: 50,
                        backgroundColor: isDarkMode ? "#10172a" : "#fefdfe",
                        fontSize: 14,
                        borderColor: state.isFocused
                          ? "grey"
                          : isDarkMode
                            ? "#ffffff20"
                            : "#dddddd",
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: isDarkMode ? "#10172a" : "#fefdfe",
                      }),
                    }}
                    onChange={(selected) => {
                      const updatedValue = [...value];
                      updatedValue[index] = {
                        ...updatedValue[index],
                        value: selected,
                      };
                      onChange(updatedValue);
                      console.log(updatedValue);
                    }}
                    components={animatedComponents}
                    defaultValue={item.value}
                    options={item.options}
                  />
                ) : (
                  <div
                    className={`flex flex-1 flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
                  >
                    <input
                      className="h-7 flex-1 w-full text-sm  bg-transparent"
                      type={"text"}
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
                )}
              </div>
            ))}
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "ipaddress" ? (
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            {icon &&
              React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
            <InputMask
              mask="999.999.999.999"
              value={value}
              onChange={(event) => onChange(event.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  className="h-7 flex-1 w-full text-sm bg-transparent"
                  name={name}
                  placeholder={placeholder}
                  disabled={disabled}
                  style={{ outline: "none" }}
                />
              )}
            </InputMask>
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : type === "currency" ? (
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2.5 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
          >
            {icon &&
              React.cloneElement(icon, { className: "h-5 w-6", fill: color })}
            <span className="text-sm">Rp. </span>
            <input
              type={"number"}
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
          </div>
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
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
          {noted && (
            <div className="flex flex-row gap-2">
              <span className="text-xs text-[#FB4B4B]">*{noted}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DynamicInput;
