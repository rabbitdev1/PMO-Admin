import React from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ImageComponent from "../../utils/helpers/getImageURL";
import PDFComponent from "../../utils/helpers/getPDFURL";
import { formatDate, formatMultiDate } from "../../utils/helpers/formatDate";



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
      className={`${value.length < 3 ? 'flex flex-row' : 'grid'} gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-2 ${className} rounded-lg border border-[#dddddd] dark:border-[#ffffff20]`}
      style={value.length < 3 ? {} : { gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}
    >
      {value.map((item, index) => {
        const name = typeof item === 'object' ? item.name : item;
        const displayValue = typeof item === 'object' && item.value ? ` : (${item.value})` : '';

        return (
          <div
            key={index}
            className="flex items-center p-1.5 px-3 text-lightColor bg-[#e6e6e6] dark:text-darkColor rounded-sm border border-[#dddddd] dark:border-[#ffffff20]"
          >
            <span className="text-xs">{name}{displayValue}</span>
          </div>
        );
      })}
    </div>
      ) : type === "date" ? (
        <div
          className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <span className="text-sm">{formatDate(value)}</span>
        </div>
      ) : type === "multidate" ? (
        <div
          className={`flex flex-row gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <span className="text-sm">{formatMultiDate(value)}</span>
        </div>
      ) : (
        <div
          className={`flex flex-col gap-2 bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-start p-3 ${className} rounded-lg border border-[#dddddd] dark:border-[#ffffff20]`}
        >
          <span className="text-sm  whitespace-normal">{value}</span>
        </div>
      )}
    </div>
  );
}

export default DynamicShow;