import React, { useEffect, useState } from "react";
import DynamicButton from "../common/DynamicButton";

const ConditionalRender = ({
  data,
  children,
  loading = true,
  className,
  model,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center overflow-hidden ${className}`}>
        <div
          role="status"
          className="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-[#1b2c46]  animate-pulse "
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    if (data.length === 0) {
      return !isVisible ? (
        <div className={`flex flex-col  h-full items-center p-3 justify-center overflow-hidden gap-2  ${className}`}>
          <div
            role="status"
            className="flex items-center justify-center h-full w-full bg-gray-200  dark:bg-[#1b2c46] animate-pulse "
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className={`flex flex-col h-full items-center p-3 justify-center overflow-hidden gap-3 ${className}`}>
          <img
            // src={
            //   model === "emptyData"
            //     ? webSetting?.otherImage["empty_box"]
            //     : model === "emptyItem"
            //       ? webSetting?.otherImage["productEmpty"]
            //       : model === "emptyForm"
            //         ? webSetting?.otherImage["empty_box"]
            //         : ""
            // }
            alt={model}
            className=" w-[30%] aspect-square object-cover flex max-w-xs bg-red-400"
          />
          <span className="text-sm ">
            {model === "emptyData"
              ? "Data Tidak Ditemukan"
              : model === "emptyItem"
                ? "Produk belum tersedia..."
                : model === "emptyForm"
                  ? "Form Tidak Ditemukan"
                  : ""}
          </span>
          {model === "emptyItem" && (
            <DynamicButton
              initialValue={"Cari Produk Lainnya"}
              type="fill"
              className="bg-[#0185FF] text-darkColor flex-1"
              href={"/"}
            />
          )}
        </div>
      );
    } else {
      return <div className="flex flex-col">{children}</div>;
    }
  }
};

export default ConditionalRender;
