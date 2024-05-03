import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Button from "../../components/common/DynamicButton.jsx";
import CheckBox from "../../components/common/CheckBox.js";
import Input from "../../components/common/DynamicInput.jsx";
import { toast } from "react-toastify";
import { isPending } from "../../components/store/actions/todoActions.js";
import { apiClient } from "../../utils/api/apiClient.js";
import { ReactComponent as UsernameIcon } from "../../assets/icon/ic_email.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icon/ic_password.svg";

import { formatTime } from "../../utils/helpers/formatTime.js";
import OTPInput from "../../components/common/OTPInput.js";
import ModalContent from "../../components/ui/Modal/ModalContent.jsx";
import LoadingLink from "../../components/common/LoadingLink.js";

const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);

  const data = location.state;
  const [selectedButton, setSelectedButton] = useState(data);

  const [remainingTime, setRemainingTime] = useState(180);
  const [intervalId, setIntervalId] = useState(null);


  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setPassword("");
    setEmail("");
  };
  const fetchLogin = async (email, password, keepLogin) => {
    dispatch(isPending(true));
    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("password", password);
      params.append("keeplogin", keepLogin);

      const response = await apiClient({
        baseurl: "user/login",
        method: "POST",
        XGORDON: "LOGIN",
        body: params,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        // if (
        //   response?.result.status_verifikasi === "Sudah Terverifikasi" &&
        //   response?.result.status_akun === "Aktif"
        // ) {
        //   const apiKey = response?.result.api_key;
        //   const token = response?.result.token;
        //   const apiData = { apiKey, token };
        //   localStorage.setItem("isLogin", JSON.stringify(apiData));
        //   fetchDataProfile(apiKey, token);
        // } else {
        //   handleSendOTP(phone, "sendotp");
        //   const timer = setInterval(() => {
        //     setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        //   }, 1000);
        //   setIntervalId(timer);
        //   return () => {
        //     clearInterval(timer);
        //   };
        // }
      } else {
        toast.error(response?.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataProfile = async (api_key, token) => {
    try {
      const params = new URLSearchParams();
      params.append("api_key", api_key);

      const response = await apiClient({
        baseurl: "user/me",
        method: "POST",
        XGORDON: "ME",
        apiKey: api_key,
        token: token,
        body: params,
      });
      if (response?.statusCode === 200) {
        localStorage.setItem("isProfile", JSON.stringify(response?.result));
        navigate("/");
      } else {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-row bg-cardLight dark:bg-cardDark flex-1 w-full h-full items-center justify-center">
      <div className="flex flex-row  rounded-lg bg-lightColor flex-1 max-w-4xl dark:bg-darkColor overflow-hidden">
        <div className="sm:flex hidden flex-1 justify-center flex-col gap-1 text-darkColor p-4 py-5 bg-gradient-to-bl from-[#056BDA] to-[#033974]">
          <div>
            <img
              src={require('../../assets/image/logo/light.png')}
              alt="logo"
              className="h-10 flex object-contain"
            />
          </div>
          <span className=" text-xl font-bold">Project Management Office</span>
          <span className=" text-sm">Sistem informasi pengelolaan aset, usulan pembuatan,
            dan pengemangan sistem digital kota bandung</span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4 py-5">
          <div className="flex flex-col mb-3">
            <span className=" text-3xl font-bold">Login</span>
            <span className=" text-sm opacity-70">Selamat Datang</span>
          </div>
          <Input
            label="Email"
            icon={<UsernameIcon />}
            value={email}
            type="email"
            placeholder={"Masukan Alamat Email"}
            onChange={(event) => setEmail(event)}
          />
          <Input
            label="Password"
            icon={<PasswordIcon />}
            value={password}
            type="password"
            placeholder={"Masukan Password"}
            onChange={(event) => setPassword(event)}
          />
          <Input
            label="Captcha"
            icon={<PasswordIcon />}
            // value={username}
            type="text"
            placeholder={"Masukan Captcha"}
          // onChange={(event) => setUsername(event)}
          />
          <div className="flex flex-row justify-between">
            <CheckBox
              label="Ingat Saya"
              onChange={(event) => setKeepLogin(event)}
            />
            <Button
              initialValue="Lupa Password?"
              type="transparent"
              className=" text-[#0185FF]"
              href={"/forgotpassword"}
            />
          </div>
          <Button
            initialValue="Masuk"
            type="fill"
            className="bg-[#0185FF] text-darkColor w-full "
            onClick={() => {
              if (!email || !password) {
                toast.error("Email and password are required", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return;
              }

              if (email.length < 8 || password.length < 8) {
                toast.error("Email and password must be at least 8 characters long", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return;
              }

              if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[\W_]/.test(password)) {
                toast.error("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                return;
              }
              fetchLogin(email, password, keepLogin);
            }}
          />
        </div>
      </div>
      {/* <div className="fixed top-0 right-0 p-2">
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
          backgroundImage: `url(${parseWebSetting?.auth?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      ></div>
      <div className="flex flex-col flex-1 gap-3  p-3">
        <div className="flex flex-row  overflow-clip rounded-lg mt-20">
          <div
            onClick={() => handleButtonClick("Masuk")}
            className={`h-12 px-4 cursor-pointer ${
              selectedButton === "Masuk"
                ? "bg-[#0185FF] text-darkColor"
                : "bg-cardLight dark:bg-cardDark text-[#7D8191] hover:opacity-80"
            } rounded-none justify-center items-center gap-2 inline-flex flex-1 transition-transform`}
          >
            <span className="font-medium line-clamp-1">Masuk</span>
          </div>
          <div
            onClick={() => handleButtonClick("Daftar")}
            className={`h-12 px-4 cursor-pointer ${
              selectedButton === "Daftar"
                ? "bg-[#0185FF] text-darkColor"
                : "bg-cardLight dark:bg-cardDark text-[#7D8191] hover:opacity-80"
            } rounded-none justify-center items-center gap-2 inline-flex flex-1 transition-transform`}
          >
            <span className="font-medium line-clamp-1">Daftar</span>
          </div>
        </div>
        <div className="flex flex-col bg-lightColor gap-3 dark:bg-cardDark p-3 rounded-lg border border-1 border-cardLight dark:border-[#363636]">
          <div className="flex flex-col">
            <h5 className={` font-semibold `}>
              {" "}
              {selectedButton === "Masuk"
                ? "Silahkan Login"
                : "Silahkan Daftar"}
            </h5>
            <span className={`text-base opacity-70`}>
              {selectedButton === "Masuk"
                ? "Masuk menggunakan Akun terdaftar Kamu"
                : "Masukan informasi pendaftaran dengan benar"}
            </span>
          </div>
          {selectedButton === "Masuk" ? (
            <div className="flex flex-col gap-3 w-full">
              <Input
                label="Nomor Whatsapp"
                id="phone"
                icon={<UsernameIcon />}
                value={phone}
                type="tel"
                placeholder={"Masukan Nomor Whatsapp"}
                onChange={(event) => setPhone(event)}
              />
              <Input
                label="Password"
                id="password"
                icon={<PasswordIcon />}
                value={password}
                type="password"
                placeholder={"Masukan Password"}
                onChange={(event) => setPassword(event)}
              />
              <div className="flex flex-row justify-between">
                <CheckBox
                  label="Ingat Saya"
                  onChange={(event) => setKeepLogin(event)}
                />
                <Button
                  initialValue="Lupa Password?"
                  type="fill"
                  className=" text-[#0185FF]"
                  href={"/forgotpassword"}
                />
              </div>
              <Button
                initialValue="Masuk"
                type="fill"
                className="bg-[#0185FF] text-darkColor flex-1"
                onClick={() => {
                  handleLogin(phone, password, keepLogin);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full">
              <Input
                label="Nama Lengkap"
                id="fullname"
                icon={<UsernameIcon />}
                value={fullname}
                type="text"
                placeholder={"Masukan Nama Lengkap"}
                onChange={(event) => setFullname(event)}
              />
              <Input
                label="Username"
                id="username"
                icon={<UsernameIcon />}
                value={username}
                type="text"
                placeholder={"Masukan Username"}
                onChange={(event) => setUsername(event)}
              />
              <Input
                label="Nomor Whatsapp"
                id="phone"
                icon={<UsernameIcon />}
                value={phone}
                type="tel"
                placeholder={"Masukan Nomor Whatsapp"}
                onChange={(event) => setPhone(event)}
              />
              <Input
                label="Email"
                id="email"
                icon={<UsernameIcon />}
                value={email}
                type="email"
                placeholder={"Masukan Email"}
                onChange={(event) => setEmail(event)}
              />
              <Input
                label="Password"
                id="password"
                icon={<PasswordIcon />}
                value={password}
                type="password"
                placeholder={"Masukan Password"}
                onChange={(event) => setPassword(event)}
              />
              <Input
                label="Konfirmasi Password"
                id="konfirmasi_password"
                icon={<PasswordIcon />}
                value={konfirmasi_password}
                type="password"
                placeholder={"Masukan Konfirmasi Password"}
                onChange={(event) => setKonfirmasi_password(event)}
              />
              <Button
                initialValue="Daftar"
                type="fill"
                className="bg-[#0185FF] text-darkColor flex-1"
                onClick={() => {
                  handleRegister(fullname, username, phone, email, password);
                }}
              />
            </div>
          )}
          <div className="p-3  flex items-center justify-center">
            <span className={`text-base`}>
              {selectedButton === "Masuk"
                ? "Belum punya akun?"
                : "Sudah punya akun?"}{" "}
              {selectedButton === "Masuk" ? (
                <span
                  onClick={() => handleButtonClick("Daftar")}
                  className="cursor-pointer font-semibold"
                >
                  Daftar Sekarang
                </span>
              ) : (
                <b
                  onClick={() => handleButtonClick("Masuk")}
                  className="cursor-pointer"
                >
                  Masuk Sekarang
                </b>
              )}
            </span>
          </div>
        </div>
      </div>

      <ModalContent
        children={
          <div className="flex flex-col z-40 items-center text-lightColor dark:text-darkColor">
            <img
              src={parseWebSetting?.logo}
              className="h-10 w-40 flex object-contain "
            />
            <span className={` text-base font-medium text-center mt-3`}>
              Verifikasi Akun Anda
            </span>
            <span className={` text-sm text-center mb-3`}>
              Masukan 6 Digit Kode Verifikasi yang dikirim ke Nomor Anda
            </span>
            <OTPInput onChange={(event) => setPIN(event)} />
            <div className="flex flex-row gap-2 justify-end w-full mt-3">
              {remainingTime === 0 ? (
                <button
                  onClick={() => {
                    handleSendOTP(phone, "resendotp");
                  }}
                >
                  <span className={` text-sm `}>Kirim ulang OTP</span>
                </button>
              ) : (
                <span className={` text-sm `}>
                  Kirim ulang kode unik dalam <b>{formatTime(remainingTime)}</b>{" "}
                  detik
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Button
                initialValue="Verifikasi Akun"
                type="fill"
                className="bg-[#0185FF] text-darkColor flex-1 mt-3"
                onClick={() => {
                  handleVerifAccount(phone, pin);
                }}
              />
            </div>
          </div>
        }
        active={isModalVerification}
        onClose={() => toggleModalVerification()}
      /> */}
    </div>
  );
};

export default LoginPage;
