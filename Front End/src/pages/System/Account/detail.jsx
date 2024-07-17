import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as PengajuanBerahasilIcon } from "../../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import { isPending } from "../../../components/store/actions/todoActions";
import ModalContent from "../../../components/ui/Modal/ModalContent";
import ModalContentComponent from "../../../components/ui/ModalContentComponent";
import { apiClient } from "../../../utils/api/apiClient";
import { generatePassword } from "../../../utils/helpers/passwordGenerator";
import { validatePassword, validateRepeatPassword } from "../../../utils/helpers/validateForm";
import DynamicDetails from "../DynamicDetails";
import { isValidatorEditPengguna } from "../validators";

function DetailsAccountPages() {
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const authProfile = Cookies.get('authData');
  const location = useLocation();
  const dispatch = useDispatch();
  const slug = location?.state?.slug || "";

  const [accountLoading, setAccountLoading] = useState(true);
  const [detailData, setDetailData] = useState([]);
  const [formData, setFormData] = useState({});
  const [captchaValue, setCaptchaValue] = useState(null);
  const [resetPasswordgenerate, setResetPasswordgenerate] = useState(null);
  const [resetPassword, setResetPassword] = useState(null);

  const [isModalType, setisModalType] = useState({ status: false, data: {} });
  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });


  useEffect(() => {
    if (authToken) {
      fetchDataAccount(authApiKey, authToken, JSON.parse(authProfile)?.role)
    }
  }, [authToken, authApiKey, authProfile]);

  const fetchDataAccount = async (api_key, token, role) => {
    setAccountLoading(true);
    const params = new URLSearchParams();
    params.append("id", slug.id);
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "users/detail",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setAccountLoading(false);
      if (response?.statusCode === 200) {
        setDetailData(response.result.data);
        const { fullname, email, address, nip, telp } = response.result.data;
        setFormData({ fullname, email, address, nip, telp });

      } else {
        setDetailData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEditUserStatus = async (api_key, token, id, newStatus) => {
    console.log(api_key, token, id, newStatus);
    dispatch(isPending(true));
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("status_account", newStatus);

    try {
      const response = await apiClient({
        baseurl: "users/user_status",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: "Pembaruan Status Pengguna Berhasil",
            msg: "Status pengguna berhasil diperbarui.",
            icon: PengajuanBerahasilIcon,
            color: "#13C39C",
          },
          status: true,
        });
        fetchDataAccount(authApiKey, authToken, JSON.parse(authProfile)?.role)
      } else {
        toast.error(response.data.msg || "Gagal memperbarui status pengguna.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Gagal memperbarui status pengguna. Silakan coba lagi nanti.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const fetchDataEdit = async (api_key, token, id, data) => {
    dispatch(isPending(true));
    const formData = new URLSearchParams();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    formData.append("id", id);
    try {
      const response = await apiClient({
        baseurl: "users/edit",
        method: "POST",
        body: formData,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        toast.success(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setisModalType({ data: '', status: false });
        setFormData({})
        setCaptchaValue(null)
        setResetPasswordgenerate(null)
        setResetPassword(null)
        fetchDataAccount(authApiKey, authToken, JSON.parse(authProfile)?.role)
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataEditPassword = async (api_key, token, id, password) => {
    dispatch(isPending(true));
    const formData = new URLSearchParams();
    formData.append("id", id);
    formData.append("password", password);
    try {
      const response = await apiClient({
        baseurl: "users/edit-password",
        method: "POST",
        body: formData,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        toast.success(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setisModalType({ data: '', status: false });
        setFormData({})
        setCaptchaValue(null)
        fetchDataAccount(authApiKey, authToken, JSON.parse(authProfile)?.role)
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkingFormData = async (combinedObject) => {
    if (captchaValue) {
      if (isValidatorEditPengguna(combinedObject)) {
        fetchDataEdit(authApiKey, authToken, slug.id, combinedObject);
      } else {
        return false;
      }
    } else {
      toast.error("Please complete the captcha", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

  };

  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
      <Breadcrumb
        title={`Detail Pengguna`}
        link1={"dashboard"}
        link2={"Account"}
      />
      <section className="flex flex-col gap-3">
        <div className="flex md:flex-row flex-col flex-1 gap-3">
          <div className="flex flex-col flex-1 gap-3 md:max-w-xs">
            <div className="flex flex-col  gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              {detailData && detailData?.image &&
                <DynamicShow
                  value={detailData?.image}
                  location={'users'}
                  type={"images"}
                />
              }
              <div className="flex flex-col">
                <span className="text-xl font-bold">{detailData?.fullname}</span>
                <span className="text-base">{detailData?.role === "op_pmo" ? "Front Office" :
                  detailData?.role === "op_pmo" ? "Front Office" :
                    detailData?.role === "kadis" ? "Kepala Dinas" :
                      detailData?.role === "perangkat_daerah" ? "Perangkat Daerah" :
                        detailData?.role === "kabid_infra" ? "Ketua Bidang Infrastruktur" :
                          detailData?.role === "katim_infra" ? "Ketua Tim Infrastruktur" :
                            detailData?.role === "teknis_infra" ? "Tim Teknis Infrastruktur" :
                              detailData?.role === "kabid_aplikasi" ? "Ketua Bidang Aplikasi" :
                                detailData?.role === "katim_aplikasi" ? "Ketua Tim Aplikasi" :
                                  detailData?.role === "teknis_aplikasi" ? "Tim Teknis Aplikasi" :
                                    detailData?.role === "kabid_perencanaan" ? "Ketua Bidang Perencanaan" :
                                      detailData?.role === "katim_perencanaan" ? "Ketua Tim Perencanaan" :
                                        detailData?.role === "teknis_perencanaan" ? "Tim Teknis Perencanaan" :
                                          detailData?.role === "sekretariat" ? "Sekretariat" :
                                            detailData?.role === "katim_sekretariat" ? "Ketua Tim Sekretariat" :
                                              detailData?.role === "teknis_sekretariat" ? "Tim Teknis Sekretariat" :
                                                detailData?.role === "kabid_desiminasi" ? "Ketua Bidang Desiminasi" :
                                                  detailData?.role === "katim_desiminasi" ? "Ketua Tim Desiminasi" :
                                                    detailData?.role === "teknis_desiminasi" ? "Tim Teknis Desiminasi" :
                                                      detailData?.role === "kabid_data" ? "Ketua Bidang Data" :
                                                        detailData?.role === "katim_data" ? "Ketua Tim Data" :
                                                          detailData?.role === "teknis_data" ? "Tim Teknis Data" : detailData?.role}</span>
              </div>
            </div>
            <div className="flex flex-col  gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">

              <div className="flex flex-row gap-2 items-center justify-between">
                <span className="text-md font-bold">
                  Status Akun :
                </span>
                <div className="flex flex-col gap-2 items-end">
                  <div
                    className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor ${detailData?.status_account === "Aktif" ? "bg-[#13C39C]" : "bg-[#FF0000]"}`}
                  >
                    <span className="text-base">
                      {detailData?.status_account}
                    </span>
                  </div>

                  {(detailData.role === "op_pmo" || detailData.role === "guest") ? null :
                    <DynamicButton
                      initialValue={detailData?.status_account === "Aktif" ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                      color={"#ffffff"}
                      type="transparent"
                      className={`${detailData?.status_account === "Aktif" ? 'text-[#FB4B4B]' : 'text-[#13C39C]'}  text-xs `}
                      onClick={() => {
                        fetchEditUserStatus(authApiKey, authToken, slug.id, (detailData?.status_account === "Aktif" ? "Nonaktif" : "Aktif"))
                      }}
                    />}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  Edit Akun Pengguna:
                </span>
                {detailData.role === "guest" ? <span className="text-xs text-[#FB4B4B]">
                  Tidak Tersedia
                </span> :
                  <DynamicButton
                    initialValue={'Edit Akun'}
                    color={"#ffffff"}
                    type="transparent"
                    className={`bg-[#0185FF] text-darkColor text-xs `}
                    onClick={() => {
                      setisModalType({ data: "Edit Pengguna", status: true })
                    }}
                  />
                }
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  Reset Password Pengguna:
                </span>
                {(detailData.role === "op_pmo" || detailData.role === "guest") ? <span className="text-xs text-[#FB4B4B]">
                  Tidak Tersedia
                </span> :
                  <DynamicButton
                    initialValue={'Reset'}
                    color={"#ffffff"}
                    type="transparent"
                    className={`bg-[#FB4B4B] text-darkColor text-xs `}
                    onClick={() => {
                      setisModalType({ data: "Reset Password Pengguna", status: true })
                    }}
                  />
                }
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col ">
            <DynamicDetails location={"users"} detailData={detailData} loading={accountLoading} />
          </div>
        </div>
      </section>

      <ModalContent
        className={"sm:max-w-xl"}
        children={
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold font-gilroy">
              {isModalType.data}
            </span>
            {isModalType.data === "Edit Pengguna" ?
              <div className="flex flex-col gap-3">
                {[
                  {
                    label: "Nama Lengkap",
                    value: formData.fullname,
                    type: "text",
                    name: "fullname",
                  },
                  {
                    label: "Email",
                    value: formData.email,
                    type: "text",
                    name: "email",
                  },
                  {
                    label: "Nomor Induk Pegawai",
                    value: formData.nip,
                    type: "text",
                    name: "nip",
                  },
                  {
                    label: "Nomor Telepon",
                    value: formData.telp,
                    type: "tel",
                    name: "telp",
                  },
                ].map((inputProps, index) => {
                  return (
                    <DynamicInput
                      key={index}
                      label={inputProps.label}
                      value={inputProps.value}
                      disabled={formData.total_price && false}
                      type={inputProps.type}
                      options={inputProps.options}
                      placeholder={'Masukan ' + inputProps.label}
                      onChange={(value) => {
                        let updatedFormData = {
                          ...formData,
                          [inputProps.name]: value,
                        };
                        setFormData(updatedFormData);
                      }}
                    />

                  );
                })}
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_TOKEN_RECAPCHA}
                  onChange={(value) => {
                    console.log("Captcha value:", value)
                    setCaptchaValue(value)
                  }
                  }
                />
                <DynamicButton
                  initialValue={isModalType.data}
                  type="fill"
                  color={"#ffffff"}
                  className="inline-flex  bg-[#0185FF] text-darkColor"
                  onClick={() => {
                    checkingFormData(formData);
                  }}
                />
              </div> :
              <div className="flex flex-col gap-3">
                <DynamicInput
                  label={"Password Baru"}
                  value={resetPasswordgenerate}
                  type={'password'}
                  disabled={false}
                  onChange={(value) => {
                    setResetPasswordgenerate(value);
                  }}
                  placeholder={'Masukan Password Baru'}
                />
                <DynamicInput
                  label={"Ulangi Password Baru"}
                  value={resetPassword}
                  type={'password'}
                  placeholder={'Masukan Password Baru'}
                  onChange={(value) => {
                    setResetPassword(value);
                  }}
                />
                <div className="flex flex-1 flex-col">
                  <DynamicButton
                    initialValue={"Generate Password"}
                    type="fill"
                    color={"#ffffff"}
                    className="inline-flex  bg-[#0185FF] text-darkColor flex-1"
                    onClick={() => {
                      const newPassword = generatePassword();
                      setResetPasswordgenerate(newPassword);
                    }}
                  />
                </div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_TOKEN_RECAPCHA}
                  onChange={(value) => {
                    console.log("Captcha value:", value)
                    setCaptchaValue(value)
                  }
                  }
                />
                <DynamicButton
                  initialValue={isModalType.data}
                  type="fill"
                  color={"#ffffff"}
                  className="inline-flex  bg-[#0185FF] text-darkColor"
                  onClick={() => {
                    if (validatePassword(resetPassword, "Password Baru") && validateRepeatPassword(resetPassword, resetPasswordgenerate)) {
                      if (captchaValue) {
                        fetchDataEditPassword(authApiKey, authToken, slug.id, resetPassword);
                      } else {
                        toast.error("Captcha harus diisi", {
                          position: toast.POSITION.TOP_RIGHT,
                        });
                      }
                    }
                  }}
                />
              </div>}
          </div>
        }
        active={isModalType.status}
        onClose={() => {
          setisModalType({ data: '', status: false });
          setFormData({})
          setResetPasswordgenerate(null)
          setResetPassword(null)
          setCaptchaValue(null)
        }}
      />


      <ModalContentComponent
        isModalVerif={isModalVerif}
        setisModalVerif={setisModalVerif}
        setisModalCreate={() => { }}
        fetchData={fetchDataAccount}
        authApiKey={authApiKey}
        authToken={authToken}
        authProfile={authProfile}
      />
    </div>
  );
}

export default DetailsAccountPages;
