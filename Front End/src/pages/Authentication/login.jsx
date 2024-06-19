import Cookies from 'js-cookie';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as UsernameIcon } from "../../assets/icon/ic_email.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icon/ic_password.svg";
import CheckBox from "../../components/common/CheckBox.js";
import Button from "../../components/common/DynamicButton.jsx";
import Input from "../../components/common/DynamicInput.jsx";
import useTheme from "../../components/context/useTheme.js";
import { isPending } from "../../components/store/actions/todoActions.js";
import { apiClient } from "../../utils/api/apiClient.js";
import ReCAPTCHA from 'react-google-recaptcha';

const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [password, setPassword] = useState("Sadang!12");
  const [email, setEmail] = useState("pmo@gmail.com");
  const [keepLogin, setKeepLogin] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const fetchLogin = async (email, password, keepLogin) => {
    dispatch(isPending(true));
    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("password", password);
      params.append("keepLogin", keepLogin);

      const response = await apiClient({
        baseurl: "login",
        method: "POST",
        body: params,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        if (response?.result?.msg === "Successful login.") {
          fetchDataProfile(response?.result?.apiKey, response?.result?.token)
        } else {
          toast.error(response?.result.msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
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
      const response = await apiClient({
        baseurl: "me",
        method: "POST",
        apiKey: api_key,
        token: token,
      });
      if (response?.statusCode === 200) {
        Cookies.set('authToken', token, { expires: keepLogin ? 1 : 1 });
        Cookies.set('authApiKey', api_key, { expires: keepLogin ? 1 : 1 });
        Cookies.set('authData', JSON.stringify(response.result.data), { expires: keepLogin ? 1 : 1 });

        setTimeout(() => {
          window.location.reload("/");
        }, 500);
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
            color={isDarkMode ? "#ffffff" : "#333333"}
            type="email"
            placeholder={"Masukan Alamat Email"}
            onChange={(event) => setEmail(event)}
          />
          <Input
            label="Password"
            icon={<PasswordIcon />}
            value={password}
            color={isDarkMode ? "#ffffff" : "#333333"}
            type="password"
            placeholder={"Masukan Password"}
            onChange={(event) => setPassword(event)}
          />
          <ReCAPTCHA
            sitekey="6LfB-_UpAAAAADb4LZJuJweoaCxi6v7QPjUT6ISw" // Ganti dengan site key Anda
            onChange={(value) => {
              console.log("Captcha value:", value)
              setCaptchaValue(value)
            }
            }
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
              if (captchaValue) {
                fetchLogin(email, password, keepLogin);
              } else {
                fetchLogin(email, password, keepLogin);

                toast.error("Please complete the captcha", {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
