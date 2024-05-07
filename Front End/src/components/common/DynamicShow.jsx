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
import ImageComponent from "../../utils/helpers/getImageURL";

function DynamicShow({
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
    setImage(URL.createObjectURL(selectedImage));
    onChange(selectedImage);
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
      {type === "html" ? (
        <div
          className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: value
            }}
            className={`text-sm min-h-[140px]`}
          />
        </div>
      ) : type === "images" ? (
        <div
          className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <ImageComponent imagePath={"images/" + value} />
        </div>
      ) : (
        <div
          className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <span className="text-sm ">{value}</span>
        </div>
      )}

    </div>
  )
}

export default DynamicShow;
