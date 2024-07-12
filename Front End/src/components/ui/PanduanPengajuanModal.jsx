import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/icon/ic_close.svg";
import ModalContent from "./Modal/ModalContent";
import DynamicButton from "../common/DynamicButton";

const PanduanPengajuanModal = ({
  isModalPanduan,
  setisModalPanduan,
  isDarkMode,
  children,
}) => {
  return (
    <ModalContent
      className={"sm:max-w-xl "}
      onClose={() => setisModalPanduan(false)}
      children={
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <span className="text-lg font-bold font-gilroy">
              Panduan Pengajuan
            </span>
            <DynamicButton
              iconLeft={<CloseIcon className="w-4 h-4 " />}
              color={isDarkMode ? "#ffffff" : "#212121"}
              type="transparent"
              className="inline-flex p-2"
              onClick={() => {
                setisModalPanduan(false);
              }}
            />
          </div>

          {children}
        </div>
      }
      active={isModalPanduan}
    />
  );
};

export default PanduanPengajuanModal;
