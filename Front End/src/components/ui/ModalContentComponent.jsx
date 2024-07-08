import React from 'react';
import ModalContent from './Modal/ModalContent';
import DynamicButton from '../common/DynamicButton';

const ModalContentComponent = ({ isModalVerif, setisModalVerif, setisModalCreate, fetchData, authApiKey, authToken, authProfile }) => {
  return (
    <ModalContent
      className={"sm:max-w-xl"}
      children={
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-center justify-center ">
            {isModalVerif.data?.icon && (
              <isModalVerif.data.icon
                className={`flex flex-col flex-1 max-w-[150%] aspect-square bg-[${isModalVerif.data.color}] rounded-full`}
              />
            )}
          </div>
          <div className="flex flex-col items-center justify-center ">
            <span className="text-lg font-bold">
              {isModalVerif.data?.title}
            </span>
            <span className="text-sm font-light text-center opacity-70">
              {isModalVerif.data?.msg}
            </span>
          </div>
          <div className="flex flex-col gap-2 ">
            <DynamicButton
              initialValue={"Kembali"}
              type="fill"
              color={"#ffffff"}
              className={`inline-flex flex-1 bg-[${isModalVerif.data.color}] text-darkColor`}
              onClick={() => {
                setisModalCreate({ data: {}, status: false });
                setisModalVerif({ data: {}, status: false });
                fetchData(
                  authApiKey,
                  authToken,
                  JSON.parse(authProfile)?.role
                );
              }}
            />
          </div>
        </div>
      }
      active={isModalVerif.status}
    />
  );
};

export default ModalContentComponent;
