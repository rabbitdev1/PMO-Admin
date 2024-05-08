import React from "react";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ImageComponent from "../../utils/helpers/getImageURL";

function DynamicShow({
  label,
  value,
  options,
  type,
  className,
}) {

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
          className={`flex flex-row gap-2  bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor items-center p-3 ${className} rounded-lg border-1 border-[#dddddd] dark:border-[#ffffff20]`}
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
