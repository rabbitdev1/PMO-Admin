import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Button from "../../components/common/DynamicButton";
import { ReactComponent as UsernameIcon } from "../../assets/icon/ic_profile.svg";
import Input from "../../components/common/DynamicInput";
import { toast } from "react-toastify";
import { isPending } from "../../components/store/actions/todoActions";
import { apiClient } from "../../utils/api/apiClient";
import Onboarding from "./onboarding";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);
  const [username, setUsername] = useState("");

  const fetchForgot = async (username) => {
    dispatch(isPending(true));
    try {
      const params = new URLSearchParams();
      params.append("nomor", username);

      const response = await apiClient({
        baseurl: "user/forgot",
        XGORDON: "FORGOT",
        method: "POST",
        body: params,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        toast.success(response?.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(response?.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleForgot = (username) => {
    const phoneRegex = /^\+62\d{8,17}$/;
    if (!phoneRegex.test(username)) {
      toast.error("Nomor telepon tidak valid. Mohon periksa masukan Anda.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    fetchForgot(username);
  };
  return (
    <div className="flex flex-row flex-1 w-full h-full">
      <div className="fixed top-0 right-0 p-2">
        <Button
          type="transparent"
          initialValue={"X"}
          className="inline-flex  "
          onClick={() => navigate("/")}
        />
      </div>
      <Onboarding parseWebSetting={parseWebSetting} />
      <div
        className=" flex-col  w-20 sm:flex lg:hidden hidden"
        style={{
          backgroundImage: `url(${parseWebSetting?.otherImage["auth"]})`,
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      ></div>
      <div className="flex flex-col flex-1 gap-3 justify-center p-3">
        <div className="flex flex-col bg-lightColor gap-3 dark:bg-cardDark p-3 rounded-lg border border-1 border-cardLight dark:border-[#363636]">
          <div className="flex flex-col">
            <h5 className={` font-semibold `}>Lupa Password</h5>
            <span className={`text-base opacity-70`}>
              Masukan Nomor Handphone yang digunakan saat mendaftar
            </span>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Input
              label="Nomor Whatsapp"
              id="phone"
              icon={<UsernameIcon />}
              value={username}
              type="tel"
              placeholder={"Masukan Nomor Whatsapp"}
              onChange={(event) => setUsername(event)}
            />
            <Button
              initialValue="Lupa Password"
              type="fill"
              className="bg-[#0185FF] text-darkColor w-full"
              onClick={() => {
                handleForgot(username);
              }}
            />
          </div>
          <div className="p-3  flex items-center justify-center">
            <span
              className={`text-base cursor-pointer`}
              onClick={() => navigate(-1)}
            >
              Ke Halaman Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
