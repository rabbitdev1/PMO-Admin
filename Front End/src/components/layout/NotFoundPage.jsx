import React, { useEffect, useState } from "react";
import DynamicButton from "../common/DynamicButton";

const NotFoundPage = () => {
  return (
    <div className="flex  min-w-full min-h-screen items-center justify-center flex-col p-4 font-gilroy ">
      <div className="gap-2 flex flex-1 flex-col items-center justify-center container ">
        <div className="flex flex-row  p-3">
          <img
            src={require('../../assets/image/Page/NotFound.png')}
            alt="other"
            className="md:max-w-md sm:max-w-sm max-w-xs w-full h-full object-contain flex "
          />
        </div>
        <div className="flex flex-col p-3">
          <span className="sm:text-3xl text-lg font-bold text-center ">Ops! Page Not Found</span>
          <span className="sm:text-base text-xs text-center opacity-70">
            The page you are looking for might have been removed had <br />
            its name changed or is temporarily unavailable.
          </span>
        </div>
        <DynamicButton
          initialValue="Kembali ke Dashboard"
          type="fill"
          className="bg-[#0185FF] text-darkColor w-full "
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
