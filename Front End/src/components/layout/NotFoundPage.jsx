import React, { useEffect, useState } from "react";

const NotFoundPage = () => {
  const [webSetting, setWebSetting] = useState();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const isWebSetting = localStorage.getItem("isWebSetting");
      setWebSetting(JSON.parse(isWebSetting));
    }
  }, []);
  return (
    <div className="flex  min-w-full min-h-screen items-center justify-center flex-col p-4 font-gilroy">
      <div className="gap-3 flex flex-col items-center container ">
        <img
          src={webSetting?.otherImage[404] || ""}
          alt="other"
          className=" w-1/2 aspect-square object-cover flex max-w-xs"
        />
        <span className="text-3xl font-bold text-center ">Page Not Found</span>
        <span className="text-base  text-center ">
          Page yang anda akses tidak tersedia
        </span>
      </div>
    </div>
  );
};

export default NotFoundPage;
