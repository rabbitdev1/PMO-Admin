import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Button from "../../components/common/DynamicButton.jsx";
import CheckBox from "../../components/common/CheckBox.js";
import Input from "../../components/common/DynamicInput.jsx";
import { toast } from "react-toastify";
import { isPending } from "../../components/store/actions/todoActions.js";
import { apiClient } from "../../utils/api/apiClient.js";

import { formatTime } from "../../utils/helpers/formatTime.js";
import OTPInput from "../../components/common/OTPInput.js";
import ModalContent from "../../components/ui/Modal/ModalContent.jsx";

const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWebSetting = localStorage.getItem("isWebSetting");
  const parseWebSetting = JSON.parse(isWebSetting);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi_password, setKonfirmasi_password] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPIN] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);
  const [isModalVerification, setIsModalVerification] = useState(false);

  const data = location.state;
  const [selectedButton, setSelectedButton] = useState(data);

  const [remainingTime, setRemainingTime] = useState(180);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // setIsModalVerification(true);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      clearInterval(intervalId);
    }
  }, [remainingTime]);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setUsername("");
    setPassword("");
    setFullname("");
    setPhone("");
    setEmail("");
  };
  const fetchLogin = async (phone, password, keepLogin) => {
    dispatch(isPending(true));
    try {
      const params = new URLSearchParams();
      params.append("nomor", phone);
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
        if (
          response?.result.status_verifikasi === "Sudah Terverifikasi" &&
          response?.result.status_akun === "Aktif"
        ) {
          const apiKey = response?.result.api_key;
          const token = response?.result.token;
          const apiData = { apiKey, token };
          localStorage.setItem("isLogin", JSON.stringify(apiData));
          fetchDataProfile(apiKey, token);
        } else {
          handleSendOTP(phone, "sendotp");
          const timer = setInterval(() => {
            setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
          }, 1000);
          setIntervalId(timer);
          return () => {
            clearInterval(timer);
          };
        }
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

  const fetchRegister = async (
    fullname,
    username,
    phone,
    email,
    password,
    konfirmasi_password,
  ) => {
    dispatch(isPending(true));
    try {
      const params = new URLSearchParams();
      params.append("full_name", fullname);
      params.append("ponsel", phone);
      params.append("password", password);
      params.append("username", username);
      params.append("konfirmasi_password", konfirmasi_password);
      params.append("email", email);

      const response = await apiClient({
        baseurl: "user/register",
        method: "POST",
        XGORDON: "REGISTER",
        body: params,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        handleSendOTP(phone, "sendotp");
        const timer = setInterval(() => {
          setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        setIntervalId(timer);
        return () => {
          clearInterval(timer);
        };
      } else {
        toast.error(response?.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleLogin = (phone, password, keepLogin) => {
    const phoneRegex = /^\+62\d{8,17}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Nomor telepon tidak valid. Mohon periksa masukan Anda.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    fetchLogin(phone, password, keepLogin);
  };
  const handleRegister = (fullname, username, phone, email, password) => {
    const fullnameRegex = /^[a-zA-Z\s-]+$/;
    if (!fullnameRegex.test(fullname)) {
      toast.error("Nama lengkap tidak valid. Mohon periksa masukan Anda.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    if (!usernameRegex.test(username)) {
      toast.error("Username tidak valid. Mohon periksa masukan Anda.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const phoneRegex = /^\+62\d{8,17}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Nomor telepon tidak valid. Mohon periksa masukan Anda.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Email tidak valid. Mohon periksa masukan Anda.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    fetchRegister(
      fullname,
      username,
      phone,
      email,
      password,
      konfirmasi_password,
    );
  };
  const toggleModalVerification = () => {
    setIsModalVerification(!isModalVerification);
  };

  const handleSendOTP = async (phone, api) => {
    dispatch(isPending(true));
    try {
      const params = new URLSearchParams();
      params.append("nomor", phone);

      const response = await apiClient({
        baseurl: "user/verifikasi",
        parameter: api,
        method: "POST",
        XGORDON: "VERIFIKASI",
        body: params,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        toggleModalVerification();
        toast.success(response?.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        if (response?.result.msg === "Kode otentikasi sudah dikirim") {
          toggleModalVerification();
          handleSendOTP(phone, "resendotp");
        } else {
          toast.error(response?.result.msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVerifAccount = async (phone, pin) => {
    dispatch(isPending(true));
    try {
      const params = new URLSearchParams();
      params.append("nomor", phone);
      params.append("otp", pin);

      const response = await apiClient({
        baseurl: "user/verifikasi",
        parameter: "verifotp",
        method: "POST",
        XGORDON: "VERIFIKASI",
        body: params,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        const apiKey = response?.result.api_key;
        const token = response?.result.token;
        const apiData = { apiKey, token };
        localStorage.setItem("isLogin", JSON.stringify(apiData));
        const timeoutId = setTimeout(() => {
          fetchDataProfile(apiKey, token);
        }, 500);
        return () => clearTimeout(timeoutId);
      } else {
        toast.error(response?.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="flex flex-row flex-1 w-full h-full">
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
