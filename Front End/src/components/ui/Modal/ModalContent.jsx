import React from "react";
import ModalComponent from "./ModalComponent";

const ModalContent = ({ children, active, onClose, className }) => {
  if (!active) return null;

  return (
    <ModalComponent>
      <div
        className={`fixed flex flex-col z-40 items-center justify-center top-0 left-0 right-0 bottom-0 bg-[#21212137] backdrop-blur-sm`}
      >
        <div
          className={`flex z-10 flex-col relative bg-lightColor dark:bg-darkColor border-1 border-[#21212118] dark:border-[#ffffff18] sm:rounded-lg   w-full max-h-full overflow-x-auto  ${className}`}
        >
          <div className="flex flex-col p-4">{children}</div>
        </div>
        <div
          className="absolute top-2 right-2 left-2 bottom-2 cursor-pointer"
          onClick={onClose}
        ></div>
      </div>
    </ModalComponent>
  );
};

export default ModalContent;
