import React from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ImageComponent from "../../utils/helpers/getImageURL";
import PDFComponent from "../../utils/helpers/getPDFURL";
import { formatDate } from "../../utils/helpers/formatDate";
import { formatArray } from "../../utils/helpers/formatArray";



function DynamicShow({ label, value, options, type, className, location }) {
  let parsedOptions = [];
  try {
    parsedOptions = JSON.parse(options);
  } catch (error) {
    // Handle JSON parsing error here
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row items-center gap-2 ">
        {label && <span className=" text-sm text-left">{label} :</span>}
      </div>
      {type === "html" ? (
        <div
          className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: value,
            }}
            className={`text-sm min-h-[140px]`}
          />
        </div>
      ) : type === "images" ? (
        <div
          className={`flex flex-row gap-2  bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <ImageComponent imagePath={`images/${location}/${value}`} />
        </div>
      ) : type === "pdf" ? (
        <div
          className={`flex flex-row gap-2  bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <PDFComponent imagePath={`files/${location}/${value}`} />
        </div>
      ) : type === "array" ? (
        <div
          className={`flex flex-row gap-2  bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          {formatArray(value).map((item, index) => (
            <div
              key={index}
              className={`flex items-center p-1.5 px-3 text-lightColor bg-[#e6e6e6] dark:text-darkColor rounded-sm border-1 border-[#dddddd] dark:border-[#ffffff20]`}
            >
              <span className="text-xs">{item}</span>
            </div>
          ))}
        </div>
      ) : type === "date" ? (
        <div
          className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <span className="text-sm">{formatDate(value)}</span>
        </div>
      ) : (
        <div
          className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <span className="text-sm ">{value}</span>
        </div>
      )}
    </div>
  );
}

export default DynamicShow;